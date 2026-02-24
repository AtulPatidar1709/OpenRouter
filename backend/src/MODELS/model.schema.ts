import { z } from "zod";

export const getModelsResponseSchema = z.object({
  models: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      company: z.object({
        id: z.string(),
        name: z.string(),
        website: z.string(),
      }),
    }),
  ),
});

export const getProvidersResponseSchema = z.object({
  providers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      website: z.string(),
    }),
  ),
});

export const getModelProvidersResponseSchema = z.object({
  providers: z.array(
    z.object({
      id: z.string(),
      providerId: z.string(),
      providerName: z.string(),
      providerWebsite: z.string(),
      inputTokenCost: z.number(),
      outputTokenCost: z.number(),
    }),
  ),
});

export type getModelProvidersResponseSchema = z.infer<typeof getModelProvidersResponseSchema>;

export type getProvidersResponseType = z.infer<typeof getProvidersResponseSchema>;

export type getModelsResponseType = z.infer<typeof getModelsResponseSchema>;
