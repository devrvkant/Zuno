import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const emailVerificationSchema = z.object({
  code: z
    .array(z.string())
    .length(6, "Code must be exactly 6 digits")
    .refine(
      (code) => code.every((digit) => digit.length === 1 && /^\d$/.test(digit)),
      {
        message: "Each digit must be a single number from 0-9",
      }
    )
    .refine((code) => code.every((digit) => digit !== ""), {
      message: "Please enter all 6 digits",
    }),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
