import { walletApi } from "@/api/wallet.api";
import { useState } from "react";

const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  async function initiatePayment(amount: number) {
    setIsError(null); // reset previous error
    setIsLoading(true);
    try {
      const data = await walletApi.initiatePayment(amount);
      return data;
    } catch (error: unknown) {
      console.error(error);
      setIsError("Something went wrong while initiating Payment");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    initiatePayment,
    isLoading,
    isError,
  };
};

export default usePayment;
