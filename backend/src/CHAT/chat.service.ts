import { once } from "events";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import { calculateCreditsUsed } from "./helper.js";
import { LlmResponse } from "./llms/Base.js";
import { Claude } from "./llms/Claude.js";
import { Gemini } from "./llms/Gemini.js";
import { OpenAi } from "./llms/OpenAi.js";
import { getProviderAdapter } from "./streaming/getProviderAdapter.js";
import { estimateTokensFromText } from "./helper/tokenCounter.js";
import { getAiDetails } from "./helper/getAiDetails.js";
import { getChatInterface } from "./chat.schema.js";

export abstract class ChatService {
  // NON-STREAMING
  static async getChatResponse({
    model,
    apiKey,
    messages,
    maxToken,
  }: getChatInterface) {
    const [_companyName, providerModelName] = model.split("/");

    const { apiKeyDb, provider, maxOutputToken, modelDb }: any =
      await getAiDetails({
        model,
        apiKey,
        maxToken,
        messages,
      });

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

    const creditsUsed = calculateCreditsUsed({
      inputTokens: response.inputTokensConsumed,
      outputTokens: response.outputTokensConsumed,
      inputCostPer1K: provider.inputTokenCost,
      outputCostPer1K: provider.outputTokenCost,
    });

    await prisma.$transaction(async (tx) => {
      // 🔒 Atomic safe deduction

      const user = await tx.user.findUnique({
        where: { id: apiKeyDb.user.id },
        select: { credits: true },
      });

      if (!user || user.credits < creditsUsed) {
        throw new Error("Insufficient credits");
      }

      const newBalance = user.credits - creditsUsed;

      await tx.walletTransaction.create({
        data: {
          userId: apiKeyDb.user.id,
          type: "USAGE_DEBIT",
          status: "SUCCESS",
          amount: -creditsUsed,
          balanceAfter: newBalance,
          metadata: {
            model: modelDb.name,
            tokens: creditsUsed,
          },
        },
      });

      const updatedUser = await tx.user.updateMany({
        where: {
          id: apiKeyDb.user.id,
          credits: { gte: creditsUsed },
        },
        data: {
          credits: { decrement: creditsUsed },
        },
      });

      if (updatedUser.count === 0) {
        throw new AppError("Insufficient balance", 403);
      }

      await tx.apiKey.update({
        where: { apiKey: apiKeyDb.apiKey },
        data: {
          creditsConsumed: { increment: creditsUsed },
        },
      });
    });

    return response;
  }

  // STREAMING
  static async getChatResponseStream({
    model,
    apiKey,
    messages,
    maxToken,
    res,
  }: getChatInterface) {
    const [_companyName, providerModelName] = model.split("/");

    const controller = new AbortController();
    const { signal } = controller;

    res.on("close", () => {
      controller.abort();
    });

    const { apiKeyDb, provider, maxOutputToken, modelDb }: any =
      await getAiDetails({
        model,
        apiKey,
        maxToken,
        messages,
      });

    const adapter = getProviderAdapter(provider.provider.name);

    const stream = adapter.streamChat({
      model: providerModelName,
      messages,
      maxOutputTokens: maxOutputToken,
      signal,
    });

    const inputTokens = estimateTokensFromText(
      messages.map((m) => m.content).join(" "),
    );

    let outputTokens = 0;
    let streamEnded = false;

    for await (const chunk of stream) {
      if ("error" in chunk) {
        res.write(
          `data: ${JSON.stringify({
            choices: [{ delta: {}, finish_reason: "error" }],
          })}\n\n`,
        );
        break;
      }

      if ("delta" in chunk) {
        const tokens = estimateTokensFromText(chunk.delta);
        outputTokens += tokens;

        if (outputTokens >= maxOutputToken) {
          res.write(
            `data: ${JSON.stringify({
              choices: [{ delta: {}, finish_reason: "length" }],
            })}\n\n`,
          );
          res.write("data: [DONE]\n\n");
          res.end();
          streamEnded = true;
          break;
        }

        const ok = res.write(
          `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk.delta } }],
          })}\n\n`,
        );

        if (!ok) {
          await once(res, "drain");
        }
      }

      if ("done" in chunk) break;
    }

    if (!streamEnded) {
      res.write(
        `data: ${JSON.stringify({
          choices: [{ delta: {}, finish_reason: "stop" }],
        })}\n\n`,
      );
      res.write("data: [DONE]\n\n");
      res.end();
    }

    const creditsUsed = calculateCreditsUsed({
      inputTokens,
      outputTokens,
      inputCostPer1K: provider.inputTokenCost,
      outputCostPer1K: provider.outputTokenCost,
    });

    await prisma.$transaction(async (tx) => {
      // 🔒 Atomic deduction

      const user = await tx.user.findUnique({
        where: { id: apiKeyDb.user.id },
        select: { credits: true },
      });

      if (!user || user.credits < creditsUsed) {
        throw new Error("Insufficient credits");
      }

      const newBalance = user.credits - creditsUsed;

      await tx.walletTransaction.create({
        data: {
          userId: apiKeyDb.user.id,
          type: "USAGE_DEBIT",
          status: "SUCCESS",
          amount: -creditsUsed,
          balanceAfter: newBalance,
          metadata: {
            model: modelDb.name,
            tokens: creditsUsed,
          },
        },
      });

      const updatedUser = await tx.user.updateMany({
        where: {
          id: apiKeyDb.user.id,
          credits: { gte: creditsUsed },
        },
        data: {
          credits: { decrement: creditsUsed },
        },
      });

      if (updatedUser.count === 0) {
        throw new AppError("Insufficient balance", 403);
      }

      await tx.apiKey.update({
        where: { apiKey: apiKeyDb.apiKey },
        data: {
          creditsConsumed: { increment: creditsUsed },
        },
      });
    });
  }
}
