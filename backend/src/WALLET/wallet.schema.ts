import { z } from "zod";

export const verifyRazorpayPaymentSchema = z.object({
  walletIdDetails: z.string(),
  razorpayOrderId: z.string().min(1, "Razorpay order ID is required"),
  razorpayPaymentId: z.string().min(1, "Razorpay payment ID is required"),
  razorpaySignature: z.string().min(1, "Razorpay signature is required"),
});

export type VerifyRazorpayPaymentInput = z.infer<
  typeof verifyRazorpayPaymentSchema
>;
