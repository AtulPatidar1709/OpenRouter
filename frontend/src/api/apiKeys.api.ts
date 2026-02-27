import { axiosApi } from "@/lib/axiosApi";
import type {
  createApiKeyType,
  DeleteApiKeysType,
  updateApiKeysType,
} from "@/types/apiKeys.schema";

export const apiKeysApi = {
  getApiKeys: () => axiosApi.get("/apikey").then((res) => res.data),

  createApiKey: (data: createApiKeyType) =>
    axiosApi.post("/apikey", data).then((res) => res.data),

  updateApiKey: (data: updateApiKeysType) =>
    axiosApi.put("/apikey", data).then((res) => res.data),

  deleteApiKey: (data: DeleteApiKeysType) =>
    axiosApi.delete("/apikey", { data }).then((res) => res.data),
};
