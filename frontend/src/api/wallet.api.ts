import { axiosApi } from "@/lib/axiosApi";

export const walletApi = {
  getWalletDetails: () => axiosApi.get("/wallet").then((res) => res.data.data),
};
