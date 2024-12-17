import express from "express";

import {
  loginSchema,
  oAuthRegisterSchema,
  registerSchema,
  verifyOtpSchema,
} from "@schemas/auth-schema";
import validate from "@middlewares/zod-validator";
import authController from "@controller/auth-controller";

const authRouter = express.Router();

authRouter.post(
  "/oauth",
  validate(oAuthRegisterSchema),
  authController.registerOAuthUser,
);
authRouter.post("/send-otp", validate(registerSchema), authController.sendOTP);
authRouter.post(
  "/verify",
  validate(verifyOtpSchema),
  authController.verifyOTPAndRegister,
);
authRouter.post("/login", validate(loginSchema), authController.login);

export default authRouter;
