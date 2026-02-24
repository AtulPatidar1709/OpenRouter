import { z } from "zod";

const nameField = z
  .string()
  .min(2, "First name must be at least 2 characters")
  .max(50, "First name must not exceed 50 characters");

const emailField = z
  .email({
    message: "Please provide a valid email address",
  })
  .toLowerCase();

const passField = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

const userIdField = z.uuid({
  message: "Invalid user ID format",
});

export { nameField, emailField, passField, userIdField };
