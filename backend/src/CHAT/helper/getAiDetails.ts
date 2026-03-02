import { prisma } from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { AppError } from "../../utils/AppError.js";
import { getChatInterface } from "../char.controller.js";

export async function getAiDetails({
  model,
  apiKey,
  maxToken,
  messages,
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
      apiKey: true,
      id: true,
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

  return {
    apiKeyDb,
    modelDb,
    providers,
    provider,
    maxOutputToken,
  };
}
