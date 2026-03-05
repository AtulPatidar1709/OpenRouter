import { config } from "@/config/config";
import { walletApi } from "@/api/wallet.api";
import type { openRazorPayPopUpTypes } from "@/types/razorpayPopUp";

function openRazorPayPopUp({
  rzpId,
  walletIdDetails,
  user,
  onSuccess,
  onClose,
}: openRazorPayPopUpTypes) {
  const rzp = new window.Razorpay({
    key: config.RZP_TEST_API_KEY,
    description: `Payment By ${user.email} for Credits ${walletIdDetails}`,
    name: "OpenRouter App",
    order_id: rzpId,
    notes: {
      walletIdDetails: walletIdDetails,
    },
    handler: async (response) => {
      try {
        const data = await walletApi.verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          walletIdDetails: walletIdDetails,
        });
        if (data.status === "success") {
          onSuccess();
        } else {
          onClose("Payment Verification Failed.");
        }
      } catch (error: unknown) {
        onClose("Verification Failed");
      }
    },
    modal: {
      ondismiss: () => {
        onClose("Payment cancelled");
      },
    },
  });

  rzp.on("payment.failed", (response) => {
    onClose(response.error?.description ?? "Payment failed");
  });

  rzp.open();
}

export default openRazorPayPopUp;
