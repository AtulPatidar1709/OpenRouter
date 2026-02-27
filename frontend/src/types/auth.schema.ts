import { emailField, nameField, passField } from "@/types/common/fields.schema";
import { z } from "zod";

/* ================= LOGIN ================= */
export const loginSchema = z.object({
  email: emailField,
  password: passField,
});

export type LoginInput = z.infer<typeof loginSchema>;

/* ================= REGISTER ================= */
export const registerSchema = loginSchema.extend({
  name: nameField,
  confirmPassword: passField,
});

export type RegisterInput = z.infer<typeof registerSchema>;

/* ================= OTP ================= */
export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type OtpInput = z.infer<typeof otpSchema>;
