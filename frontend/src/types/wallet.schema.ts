import { z } from "zod";
import { orderIdField } from "./common/fields.schema";

export const verifyRazorpayPaymentSchema = z.object({
  walletIdDetails: orderIdField,
  razorpayOrderId: z.string().min(1, "Razorpay order ID is required"),
  razorpayPaymentId: z.string().min(1, "Razorpay payment ID is required"),
  razorpaySignature: z.string().min(1, "Razorpay signature is required"),
});

export type VerifyRazorpayPaymentInput = z.infer<
  typeof verifyRazorpayPaymentSchema
>;
