import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiKeysApi } from "../api/apiKeys.api";
import type {
  createApiKeyType,
  updateApiKeysType,
  DeleteApiKeysType,
} from "../types/apiKeys.schema";
import type { ApiError } from "@/types/apiError";
import { toast } from "react-toastify";

/* ================= GET API KEYS ================= */
export const useApiKeysQuery = () => {
  const query = useQuery({
    queryKey: ["api-keys"],
    queryFn: apiKeysApi.getApiKeys,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  return {
    apiKeys: query.data ?? [],
    isApiKeysLoading: query.isLoading,
    isApiKeysError: query.isError,
  };
};

/* ================= API KEYS MUTATIONS ================= */
export const useApiKeys = () => {
  const queryClient = useQueryClient();

  /* CREATE */
  const createMutation = useMutation({
    mutationFn: apiKeysApi.createApiKey,
    onSuccess: () => {
      toast.success("API key created successfully");
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
    onError: (err: ApiError) => {
      toast.error(err.message);
    },
  });

  /* UPDATE (Enable / Disable) */
  const updateMutation = useMutation({
    mutationFn: apiKeysApi.updateApiKey,
    onSuccess: () => {
      toast.success("API key updated");
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
    onError: (err: ApiError) => {
      toast.error(err.message);
    },
  });

  /* DELETE */
  const deleteMutation = useMutation({
    mutationFn: apiKeysApi.deleteApiKey,
    onSuccess: () => {
      toast.success("API key deleted");
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
    onError: (err: ApiError) => {
      toast.error(err.message);
    },
  });

  return {
    createApiKey: (data: createApiKeyType) => createMutation.mutate(data),

    updateApiKey: (data: updateApiKeysType) => updateMutation.mutate(data),

    deleteApiKey: (data: DeleteApiKeysType) => deleteMutation.mutate(data),

    isCreateLoading: createMutation.isPending,
    isUpdateLoading: updateMutation.isPending,
    isDeleteLoading: deleteMutation.isPending,
  };
};
