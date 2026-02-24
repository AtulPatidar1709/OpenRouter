import { prisma } from "../config/prisma.js";

const API_KEY_LENGTH = 20;
const ALPHABET_SET =
  "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP1234567890";

export abstract class ApiKeyService {
  static createRandomApiKey() {
    let suffixKey = "";
    for (let i = 0; i < API_KEY_LENGTH; i++) {
      suffixKey +=
        ALPHABET_SET[Math.floor(Math.random() * ALPHABET_SET.length)];
    }
    return `sk-or-v1-${suffixKey}`;
  }

  static async createApiKey(
    name: string,
    userId: string,
  ): Promise<{
    id: string;
    apiKey: string;
  }> {
    const apiKey = ApiKeyService.createRandomApiKey();
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

  static async getApiKeys(userId: string) {
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

  static async updateApiKeyDisabled(
    id: string,
    userId: string,
    disabled: boolean,
  ) {
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

  static async delete(id: string, userId: string) {
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
}
