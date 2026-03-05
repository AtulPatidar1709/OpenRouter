import { axiosApi } from "@/lib/axiosApi";
import type { VerifyRazorpayPaymentInput } from "@/types/wallet.schema";

export const walletApi = {
  getWalletDetails: () => axiosApi.get("/wallet").then((res) => res.data.data),
  initiatePayment: (amount: number) =>
    axiosApi
      .post("/wallet/initiate-payment", {
        amount,
      })
      .then((res) => res.data.data),
  verifyPayment: (data: VerifyRazorpayPaymentInput) =>
    axiosApi.post("/wallet/verify-payment", data).then((res) => res.data),
};
