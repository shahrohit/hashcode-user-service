import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import {
  oAuthRegister,
  TLoginUser,
  TRegisterUser,
  TVerifyOtp,
} from "@schemas/auth-schema";
import authService from "@services/auth-service";
import { CREATED } from "@utils/strings";
import generateOTP from "@/utils/generate-otp";
import sendEmailVerificationOTP from "@/utils/send-email-otp";
import { BadRequest, Conflict, Forbidden } from "@/utils/errors";
import authRepository from "@/repositories/auth-repository";

const map: {
  [name: string]: {
    body: TRegisterUser;
    otp: number;
    otpExpires: number;
  };
} = {};

const registerOAuthUser = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as oAuthRegister;

    const response = await authService.registerOAuthUser(body);

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.CREATED,
      message: CREATED,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
const sendOTP = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TRegisterUser;

    const user = await authRepository.getUser(body.email, body.username);
    if (user) {
      const isEmail = user.email === body.email;
      const message = isEmail
        ? "Email is Already Registerd"
        : "Username is Already Taken";

      throw new Conflict(message);
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    map[body.email] = { body, otp, otpExpires };

    sendEmailVerificationOTP(body.email, otp);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: "OTP send to email",
      data: {
        email: body.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
const register = async (req: Req, res: Res, next: NextFn) => {
  try {
    const { email, otp } = req.body as TVerifyOtp;
    if (!map[email]) throw new BadRequest("Invalid Email provided");

    const body = map[email].body;
    const storedOtp = map[email].otp;
    const otpExpires = map[email].otpExpires;

    if (otp !== storedOtp) throw new BadRequest("Invalid OTP");
    if (otpExpires < Date.now()) {
      throw new BadRequest("OTP Expire");
    }

    delete map[email];

    await authService.register(body);

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.CREATED,
      message: CREATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TLoginUser;
    const response = await authService.login(body);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: "Logged In",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const authController = {
  register,
  login,
  registerOAuthUser,
  sendOTP,
};

export default authController;
