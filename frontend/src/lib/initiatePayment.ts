import { useUserQuery } from "@/hooks/auth.hooks";
import usePayment from "@/hooks/payment.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import openRazorPayPopUp from "./openRazorPayPopUp";

export const usePaymentInitiate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { initiatePayment, isLoading: paymentIsLoading } = usePayment();

  const { user } = useUserQuery();

  async function handleCheckout(amount: number) {
    if (!amount) {
      toast.warn("Please enter an amount.");
      return;
    }

    if (!user) {
      toast.error("User not found. Please login again.");
      return;
    }

    try {
      // check payment verification and initiate payment from backend.
      const data = await initiatePayment(amount);
      if (!data.walletId || !data.rzorderData) {
        return;
      } else {
        //Redirect UTR Do Payment and send info to backend to verify again.
        openRazorPayPopUp({
          rzpId: data?.rzorderData,
          walletIdDetails: data?.walletId,
          user,
          onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ["user"] });
            queryClient.removeQueries({ queryKey: ["wallet"] });
            toast.success("Credits added Successfully");
            navigate("/");
          },
          onClose: (msg?: string) => {
            toast.error(msg);
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    }
  }

  return {
    handleCheckout,
    paymentIsLoading,
  };
};
