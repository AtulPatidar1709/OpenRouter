import { z } from "zod";
import { emailField, nameField, passField, userIdField } from "../types/fields.schema.js";

export const registerSchema = z.object({
  email: emailField,
  password: passField,
});

export const loginSchema = z.object({
  email: emailField,
  password: passField,
});

export const OtpVerifySchema = z.object({
  userId: userIdField,
  otp: z.string(),
});

export const jwtPayload = z.object({
  userId: emailField,
});

export const sendOtpInput = z.object({
  email: emailField,
});

export type RegisterInputTypes = z.infer<typeof registerSchema>;
export type loginInputTypes = z.infer<typeof loginSchema>;
export type OtpVerifyInput = z.infer<typeof OtpVerifySchema>;
export type jwtPayloadType = z.infer<typeof jwtPayload>;
export type sendOtpInputType = z.infer<typeof sendOtpInput>;
