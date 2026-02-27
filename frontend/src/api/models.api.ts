import { axiosApi } from "@/lib/axiosApi";
import type { getModelsResponseType } from "@/types/model.schema";

export const modelsApi = {
  getAllModels: (): Promise<getModelsResponseType[] | null> =>
    axiosApi.get("/model").then((res) => res.data.data),
  getAllProviders: () =>
    axiosApi.get("/model/providers").then((res) => res.data.data),
  getModelsProviders: (id: string) =>
    axiosApi.get(`/model/${id}/providers`).then((res) => res.data.data),
};
