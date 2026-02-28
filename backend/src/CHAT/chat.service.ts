import { number } from "zod";
import { prisma } from "../config/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../utils/AppError.js";
import { getChatInterface } from "./char.controller.js";
import { calculateCreditsUsed } from "./helper.js";
import { LlmResponse } from "./llms/Base.js";
import { Claude } from "./llms/Claude.js";
import { Gemini } from "./llms/Gemini.js";
import { OpenAi } from "./llms/OpenAi.js";
import { getProviderAdapter } from "./streaming/getProviderAdapter.js";
import { estimateTokensFromText } from "./helper/tokenCounter.js";

export abstract class ChatService {
  static async getChatResponse({
    model,
    apiKey,
    messages,
    maxToken,
    stream,
  }: getChatInterface) {
    const [_companyName, providerModelName] = model.split("/");

    const apiKeyDb = await prisma.apiKey.findFirst({
      where: {
        apiKey,
        disabled: false,
        deleted: false,
      },
      select: {
        user: true,
      },
    });

    if (!apiKeyDb) {
      throw new AppError("Invalid api key", 403);
    }

    if (apiKeyDb.user.credits <= new Prisma.Decimal(0.0)) {
      throw new AppError("You dont have enough credits in your db", 403);
    }

    const modelDb = await prisma.model.findFirst({
      where: {
        slug: model,
      },
    });

    if (!modelDb) {
      throw new AppError("This is an invalid model we dont support", 403);
    }

    const providers = await prisma.modelProviderMapping.findMany({
      where: {
        modelId: modelDb.id,
      },
      include: {
        provider: true,
      },
    });

    const provider = providers[Math.floor(Math.random() * providers.length)];

    const maxTokenUserCanUse =
      (apiKeyDb.user.credits.toNumber() / provider.outputTokenCost.toNumber()) *
      1000;

    const maxOutputToken = Math.floor(
      Math.min(Number(maxToken ?? 1024), maxTokenUserCanUse),
    );

    console.log("Max Token We can use ", maxOutputToken);

    let response: LlmResponse | null = null;
    if (provider.provider.name === "Google API") {
      response = await Gemini.chat(providerModelName, messages, maxOutputToken);
    }

    if (provider.provider.name === "Google Vertex") {
      response = await Gemini.chat(providerModelName, messages, maxOutputToken);
    }

    if (provider.provider.name === "OpenAI") {
      response = await OpenAi.chat(providerModelName, messages, maxOutputToken);
    }

    if (provider.provider.name === "Claude API") {
      response = await Claude.chat(providerModelName, messages, maxOutputToken);
    }

    if (!response) {
      throw new AppError("No provider found for this model", 403);
    }

    console.log("Response after AI API CAll ,", response);

    const MIN_CREDITS_PER_REQUEST = 0.25;

    const calculatedCredits = calculateCreditsUsed({
      inputTokens: response.inputTokensConsumed,
      outputTokens: response.outputTokensConsumed,
      inputCostPer1K: provider.inputTokenCost.toNumber(),
      outputCostPer1K: provider.outputTokenCost.toNumber(),
    });

    const creditsUsed = Prisma.Decimal.max(
      calculatedCredits,
      new Prisma.Decimal(MIN_CREDITS_PER_REQUEST),
    );

    const res = await prisma.user.update({
      where: {
        id: apiKeyDb.user.id,
      },
      data: {
        credits: {
          decrement: creditsUsed,
        },
      },
    });

    const res2 = await prisma.apiKey.update({
      where: {
        apiKey: apiKey,
      },
      data: {
        creditsConsumed: {
          increment: creditsUsed,
        },
      },
    });

    return response;
  }

  static async getChatResponseStream({
    model,
    apiKey,
    messages,
    maxToken,
    res,
  }: getChatInterface) {
    const [_companyName, providerModelName] = model.split("/");

    const apiKeyDb = await prisma.apiKey.findFirst({
      where: { apiKey, disabled: false, deleted: false },
      select: { user: true },
    });

    if (!apiKeyDb) throw new AppError("Invalid api key", 403);

    if (apiKeyDb.user.credits <= new Prisma.Decimal(0)) {
      throw new AppError("You dont have enough credits", 403);
    }

    const modelDb = await prisma.model.findFirst({
      where: { slug: model },
    });

    if (!modelDb) throw new AppError("Invalid model", 403);

    const providers = await prisma.modelProviderMapping.findMany({
      where: { modelId: modelDb.id },
      include: { provider: true },
    });

    const provider = providers[Math.floor(Math.random() * providers.length)];

    const maxTokenUserCanUse =
      (apiKeyDb.user.credits.toNumber() / provider.outputTokenCost.toNumber()) *
      1000;

    const maxOutputToken = Math.floor(
      Math.min(Number(maxToken ?? 1024), maxTokenUserCanUse),
    );

    const adapter = getProviderAdapter(provider.provider.name);
    const stream = adapter.streamChat({
      model: providerModelName,
      messages,
      maxOutputTokens: maxOutputToken,
    });

    // --- TOKEN TRACKING ---
    let inputTokens = estimateTokensFromText(
      messages.map((m) => m.content).join(" "),
    );
    let outputTokens = 0;

    let creditsRemaining = apiKeyDb.user.credits.toNumber();

    const inputCostPerToken = provider.inputTokenCost.toNumber() / 1000;
    const outputCostPerToken = provider.outputTokenCost.toNumber() / 1000;

    // 🔒 charge input tokens upfront
    const inputCost = inputTokens * inputCostPerToken;
    creditsRemaining -= inputCost;

    if (creditsRemaining <= 0) {
      throw new AppError("Not enough credits for input tokens", 402);
    }

    let streamEnded = false;

    // --- STREAM LOOP ---
    for await (const chunk of stream) {
      if (chunk.delta) {
        const tokens = estimateTokensFromText(chunk.delta);
        outputTokens += tokens;

        const cost = tokens * outputCostPerToken;
        creditsRemaining -= cost;

        if (creditsRemaining <= 0) {
          res.write(
            `data: ${JSON.stringify({
              choices: [{ delta: {}, finish_reason: "credits" }],
            })}\n\n`,
          );
          res.write("data: [DONE]\n\n");
          res.end();
          streamEnded = true;
          break;
        }

        res.write(
          `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk.delta } }],
          })}\n\n`,
        );
      }

      if (chunk.done) break;
    }

    // ✅ normal completion
    if (!streamEnded) {
      res.write(
        `data: ${JSON.stringify({
          choices: [{ delta: {}, finish_reason: "stop" }],
        })}\n\n`,
      );
      res.write("data: [DONE]\n\n");
      res.end();
    }

    // --- FINAL BILLING ---
    const creditsUsed = calculateCreditsUsed({
      inputTokens,
      outputTokens,
      inputCostPer1K: provider.inputTokenCost.toNumber(),
      outputCostPer1K: provider.outputTokenCost.toNumber(),
    });

    await prisma.$transaction([
      prisma.user.update({
        where: { id: apiKeyDb.user.id },
        data: { credits: { decrement: creditsUsed } },
      }),
      prisma.apiKey.update({
        where: { apiKey },
        data: { creditsConsumed: { increment: creditsUsed } },
      }),
    ]);
  }
}
