import { useQuery } from "@tanstack/react-query";
import { walletApi } from "@/api/wallet.api";

/* ================= GET API KEYS ================= */
export const useWalletQuery = () => {
  const query = useQuery({
    queryKey: ["wallet"],
    queryFn: walletApi.getWalletDetails,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  return {
    walletTransaction: query.data ?? [],
    walletisLoading: query.isLoading,
    walletisError: query.isError,
  };
};
