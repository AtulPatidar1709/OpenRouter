import { NextFunction, Request, Response } from 'express';
import * as authService from "./auth.service.js";
import { config } from '../config/config.js';
import { AuthenticatedRequest } from '../types/AuthenticatedRequestTypes.js';
import { loginSchema, OtpVerifySchema, registerSchema, sendOtpInput } from './auth.schema.js';
import { getUserId } from './helper/helper.js';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      signed: true,
      secure: config.environment === 'production',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      signed: true,
      secure: config.environment === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      user: result.User,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtpController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);
    const resData = {
      ...req.body,
      userId
    };
    const data = OtpVerifySchema.parse(resData);
    const result = await authService.verifyOtp(data);
    res.status(203).json(result);
  } catch (error) {
    next(error);
  }
};

export const sendOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = sendOtpInput.parse(req.body);
    const result = await authService.sendOtp(data);
    res.status(203).json(result);
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.signedCookies;
    const { accessToken } = await authService.refreshToken(refreshToken);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      signed: true,
      secure: config.environment === 'production',
      maxAge: 15 * 60 * 1000,
    });
    res.status(203).json({ message: 'Token Fetch Successfully' });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = _req.signedCookies;
    await authService.logOut(refreshToken);
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};
