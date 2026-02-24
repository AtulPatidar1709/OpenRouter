import { z } from "zod";
import { userIdField } from "../types/fields.schema.js";

export const createApiKeySchema = z.object({
   name: z.string().min(4),
})

export const createApiKeyReponse = z.object({
  id: z.string(),
  apiKey: z.string(),
});

export const getApiKeysResponseSchema = z.object({
  apiKeys: z.array(
    z.object({
      id: z.string(),
      apiKey: z.string(),
      name: z.string(),
      credisConsumed: z.number(),
      lastUsed: z.nullable(z.date()),
      disabled: z.boolean(),
    }),
  ),
});

export const DeleteApiKeysSchema = z.object({
  userId: userIdField,
  id: userIdField,
});

export const updateApiKeysSchema = DeleteApiKeysSchema.extend({
  disabled: z.boolean(),
});



export type getApiKeysResponseType = z.infer<typeof getApiKeysResponseSchema>;

export type createApiKeyReponse = z.infer<typeof createApiKeyReponse>;

export type createApiKeyType = z.infer<typeof createApiKeySchema>;

export type updateApiKeysType = z.infer<typeof updateApiKeysSchema>;

export type DeleteApiKeysType = z.infer<typeof DeleteApiKeysSchema>;
