import { modelsApi } from "@/api/models.api";
import { useQuery } from "@tanstack/react-query";

/* ================= USER QUERY ================= */
export const useModelsQuery = () => {
  const query = useQuery({
    queryKey: ["models"],
    queryFn: () => modelsApi.getAllModels(),
    retry: 3,
    staleTime: Infinity,
  });

  return {
    models: query.data,
    isModelsLoading: query.isLoading,
    isModelsError: query.isError,
  };
};

/* ================= Get All Provider's ================= */
export const useProvidersQuery = () => {
  const query = useQuery({
    queryKey: ["providers"],
    queryFn: () => modelsApi.getAllProviders(),
    retry: 3,
    staleTime: Infinity,
  });

  return {
    providers: query.data ?? null,
    isProvidersLoading: query.isLoading,
    isProvidersError: query.isError,
  };
};

/* =============== Get All Provides who provides that Model =============== */
export const useProviderModelsQuery = (id: string) => {
  const query = useQuery({
    queryKey: ["modelProviders", id],
    queryFn: () => modelsApi.getModelsProviders(id),
    retry: 3,
    staleTime: Infinity,
  });

  return {
    modelProviders: query.data ?? null,
    isModelProvidersLoading: query.isLoading,
    isModelProvidersError: query.isError,
  };
};
