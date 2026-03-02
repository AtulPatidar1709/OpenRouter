import { prisma } from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { AppError } from "../../utils/AppError.js";
import { getChatInterface } from "../char.controller.js";
import { estimateTokensFromText } from "./tokenCounter.js";

export async function getAiDetails({
  model,
  apiKey,
  maxToken,
  messages,
}: getChatInterface) {
  const apiKeyDb = await prisma.apiKey.findFirst({
    where: {
      apiKey,
      disabled: false,
      deleted: false,
    },
    select: {
      user: true,
      apiKey: true,
      id: true,
    },
  });

  if (!apiKeyDb) {
    throw new AppError("Invalid api key", 403);
  }

  if (apiKeyDb.user.credits <= 0) {
    throw new AppError("You dont have enough credits", 403);
  }

  const modelDb = await prisma.model.findFirst({
    where: { slug: model },
  });

  if (!modelDb) {
    throw new AppError("Invalid model", 403);
  }

  const providers = await prisma.modelProviderMapping.findMany({
    where: { modelId: modelDb.id },
    include: { provider: true },
  });

  const provider = providers[Math.floor(Math.random() * providers.length)];

  const estimatedInputTokens = estimateTokensFromText(
    messages.map((m) => m.content).join(" "),
  );

  // ✅ Calculate input cost in RUPEES (Decimal)
  const inputCostRupees = new Prisma.Decimal(estimatedInputTokens)
    .div(1000)
    .mul(provider.inputTokenCost);

  // ✅ Convert RUPEES → PAISE
  const inputCostPaise = inputCostRupees.mul(100).ceil().toNumber();

  const remainingPaise = apiKeyDb.user.credits - inputCostPaise;

  if (remainingPaise <= 0) {
    throw new AppError("Not enough credits for input tokens", 402);
  }

  // Convert paise → rupees (Decimal)
  const remainingRupees = new Prisma.Decimal(remainingPaise).div(100);

  const maxTokenUserCanUse = remainingRupees
    .div(provider.outputTokenCost)
    .mul(1000)
    .floor()
    .toNumber();

  const maxOutputToken = Math.min(Number(maxToken ?? 1024), maxTokenUserCanUse);

  return {
    apiKeyDb,
    modelDb,
    providers,
    provider,
    maxOutputToken,
  };
}
