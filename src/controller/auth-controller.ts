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
import authRepository from "@repositories/auth-repository";

import { CREATED } from "@utils/strings";
import generateOTP, { generateExpiryTime } from "@utils/generate-otp";
import sendEmailVerificationOTP from "@utils/send-email-otp";
import { BadRequest, Conflict, Forbidden } from "@utils/errors";

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
    const otpExpires = generateExpiryTime(5);

    map[body.email] = { body, otp, otpExpires };

    sendEmailVerificationOTP(body.email, body.name, otp);

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
const verifyOTPAndRegister = async (req: Req, res: Res, next: NextFn) => {
  try {
    const { email, otp } = req.body as TVerifyOtp;
    if (!map[email]) throw new Forbidden("Invalid Email provided");

    const body = map[email].body;
    const storedOtp = map[email].otp;
    const otpExpires = map[email].otpExpires;

    if (otpExpires < Date.now()) throw new Forbidden("OTP Expire");
    if (otp !== storedOtp) throw new BadRequest("Invalid OTP");

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
const getUserByUsername = async (req: Req, res: Res, next: NextFn) => {
  try {
    const { username } = req.params as { username: string | undefined };
    if (!username) throw new BadRequest("Invalid User");

    const response = await authRepository.getUserByUsername(username);

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
const getUserIdByUsername = async (req: Req, res: Res, next: NextFn) => {
  try {
    const { username } = req.params as { username: string | undefined };
    if (!username) throw new BadRequest("Invalid User");

    const response = await authRepository.getUserIdByUsername(username);

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
  verifyOTPAndRegister,
  login,
  registerOAuthUser,
  sendOTP,
  getUserByUsername,
  getUserIdByUsername,
};

export default authController;
