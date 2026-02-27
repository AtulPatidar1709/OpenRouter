import { prisma } from "../config/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../utils/AppError.js";
import { getChatInterface } from "./char.controller.js";
import { calculateCreditsUsed } from "./helper.js";
import { LlmResponse } from "./llms/Base.js";
import { Claude } from "./llms/Claude.js";
import { Gemini } from "./llms/Gemini.js";
import { OpenAi } from "./llms/OpenAi.js";

export abstract class ChatService {
  static async getChatResponse({ model, apiKey, messages }: getChatInterface) {
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

    let response: LlmResponse | null = null;
    if (provider.provider.name === "Google API") {
      response = await Gemini.chat(providerModelName, messages);
    }

    if (provider.provider.name === "Google Vertex") {
      response = await Gemini.chat(providerModelName, messages);
    }

    if (provider.provider.name === "OpenAI") {
      response = await OpenAi.chat(providerModelName, messages);
    }

    if (provider.provider.name === "Claude API") {
      response = await Claude.chat(providerModelName, messages);
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
}
