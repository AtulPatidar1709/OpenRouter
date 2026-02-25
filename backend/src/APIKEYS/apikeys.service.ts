import { prisma } from "../config/prisma.js";

const API_KEY_LENGTH = 20;
const ALPHABET_SET = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP1234567890";

  function createRandomApiKey() {
    let suffixKey = "";
    for (let i = 0; i < API_KEY_LENGTH; i++) {
      suffixKey +=
        ALPHABET_SET[Math.floor(Math.random() * ALPHABET_SET.length)];
    }
    return `sk-or-v1-${suffixKey}`;
  }

  export const createApiKey = async (
    name: string,
    userId: string,
  ): Promise<{
    id: string;
    apiKey: string;
  }> => {
    const apiKey = createRandomApiKey();
    const apiKeyDb = await prisma.apiKey.create({
      data: {
        name,
        apiKey,
        userId,
      },
    });

    return {
      id: apiKeyDb.id.toString(),
      apiKey,
    };
  }

  export const getApiKeys = async (userId: string) => {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId: userId,
        deleted: false,
      },
    });

    return apiKeys.map((apiKey) => ({
      id: apiKey.id.toString(),
      apiKey: apiKey.apiKey,
      name: apiKey.name,
      credisConsumed: apiKey.creditsConsumed,
      lastUsed: apiKey.lastUsed,
      disabled: apiKey.disabled,
    }));
  }

  export const updateApiKeyDisabled = async (
    id: string,
    userId: string,
    disabled: boolean,
  ) => {
    await prisma.apiKey.update({
      where: {
        id,
        userId,
      },
      data: {
        disabled,
      },
    });
  }

  export const deleteApi = async (id: string, userId: string) => {
    await prisma.apiKey.update({
      where: {
        id,
        userId,
      },
      data: {
        deleted: true,
      },
    });
  }

