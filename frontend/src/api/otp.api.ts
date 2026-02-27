import { axiosApi } from "@/lib/axiosApi";

export const otpApi = {
  verifyOtp: (otp: string) =>
    axiosApi.post("/auth/verify-otp", { otp }).then((res) => res.data),

  resendOtp: (email: string) =>
    axiosApi.post("/auth/send-otp", { email }).then((res) => res.data),
};
