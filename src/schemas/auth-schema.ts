import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "Name is Required" }).min(1, "Name is Required"),

  email: z.string({ message: "Email is Required" }).email("Invalid Email"),

  username: z
    .string({ message: "Username is Required" })
    .min(1, "Username is Required"),

  password: z
    .string({ message: "Password is Required" })
    .min(8, "Password Should have minimum 8 characters"),
});

export const oAuthRegisterSchema = z.object({
  name: z.string({ message: "Name is Required" }).min(1, "Name is Required"),

  email: z.string({ message: "Email is Required" }).email("Invalid Email"),

  username: z
    .string({ message: "Username is Required" })
    .min(1, "Username is Required"),

  avatar: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string({ message: "Email is Required" }).email("Invalid Email"),

  password: z
    .string({ message: "Password is Required" })
    .min(1, "Password is Required"),
});

export const verifyOtpSchema = z.object({
  email: z.string({ message: "Email is Required" }).email("Invalid Email"),
  otp: z.coerce.number({ message: "OTP is Required" }).positive("Invalid OTP"),
});

export type TRegisterUser = z.infer<typeof registerSchema>;
export type oAuthRegister = z.infer<typeof oAuthRegisterSchema>;
export type TLoginUser = z.infer<typeof loginSchema>;
export type TVerifyOtp = z.infer<typeof verifyOtpSchema>;
