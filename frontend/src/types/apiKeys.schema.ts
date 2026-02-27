import { z } from "zod";

export const createApiKeySchema = z.object({
  name: z.string().min(4),
});

export const apiKeySchema = z.object({
  id: z.string(),
  apiKey: z.string(),
  name: z.string(),
  credisConsumed: z.number(),
  lastUsed: z.date().nullable(),
  disabled: z.boolean(),
});

export const getApiKeysResponseSchema = z.array(apiKeySchema);

export const updateApiKeysSchema = z.object({
  id: z.string(),
  disabled: z.boolean(),
});

export const deleteApiKeysSchema = z.object({
  id: z.string(),
});

export type ApiKey = z.infer<typeof apiKeySchema>;
export type createApiKeyType = z.infer<typeof createApiKeySchema>;
export type updateApiKeysType = z.infer<typeof updateApiKeysSchema>;
export type DeleteApiKeysType = z.infer<typeof deleteApiKeysSchema>;
