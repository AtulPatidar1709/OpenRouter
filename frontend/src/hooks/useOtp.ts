import { useMutation, useQueryClient } from "@tanstack/react-query";
import { otpApi } from "../api/otp.api";
import type { ApiError } from "@/types/apiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useOtp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const verifyOtpMutation = useMutation({
    mutationFn: otpApi.verifyOtp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message ?? "OTP verified successfully");
      navigate("/");
    },
    onError: (error: ApiError) => {
      console.log("error in otp Verification ", error);
      toast.error(error.message ?? "OTP verification failed");
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: otpApi.resendOtp,
    onSuccess: (data) => {
      toast.success(data.message ?? "OTP resent successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error.message ?? "Failed to resend OTP");
    },
  });

  return {
    verifyOtp: verifyOtpMutation.mutate,
    resendOtp: resendOtpMutation.mutate,

    isVerifying: verifyOtpMutation.isPending,
    isResending: resendOtpMutation.isPending,
  };
};
