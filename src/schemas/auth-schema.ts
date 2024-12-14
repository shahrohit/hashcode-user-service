import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Email is Required"),
  username: z.string().min(1, "Username is Required"),
  password: z.string().min(8, "Password Should have minimum 8 characters"),
  country: z.string().optional(),
});

export const oAuthRegisterSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Email is Required"),
  username: z.string().min(1, "Username is Required"),
  avatar: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Email is Required"),
  password: z.string().min(1, "Password is Required"),
  lastLoginAddress: z.string().optional(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid Email"),
  otp: z.coerce.number().positive("Invalid OTP"),
});
export const forgotPasswordSchema = z.object({
  email: z.string().email("Email is Required"),
});

export type TRegisterUser = z.infer<typeof registerSchema>;
export type oAuthRegister = z.infer<typeof oAuthRegisterSchema>;
export type TLoginUser = z.infer<typeof loginSchema>;
export type TVerifyOtp = z.infer<typeof verifyOtpSchema>;
