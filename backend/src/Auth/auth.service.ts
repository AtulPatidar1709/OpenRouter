import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma.js';
import { generateOtp } from '../utils/otp.js';
import { AppError } from '../utils/AppError.js';
import { sendEmail } from "./helper/nodeMailer.js";
import { jwtPayloadType, loginInputTypes, OtpVerifyInput, RegisterInputTypes, sendOtpInputType } from './auth.schema.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

export const register = async (data: RegisterInputTypes) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });

  const otp = generateOtp();

  await prisma.oTPVerification.create({
    data: {
      userId: user.id,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  if (!user.email) {
    throw new AppError('User Name is not Valid.', 400);
  }

  await sendEmail(user.email, otp);

  // send OTP (SMS / Email)
  return { userId: user.id, message: 'OTP sent' };
};

export const login = async (data: loginInputTypes) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }],
    },
  });

  if (!user || !user.password) throw new AppError("Invalid credentials");

  const valid = await bcrypt.compare(data.password, user.password);

  if (!valid) throw new AppError("Invalid credentials");

  const jwtPayload: { userId: string } = {
    userId: user.id,
  };

  const accessToken = generateAccessToken(jwtPayload);
  const refreshToken = generateRefreshToken(jwtPayload);

  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const User = {
    id: user.id,
    email: user.email,
  };

  return { accessToken, refreshToken, User };
};

export const sendOtp = async (data: sendOtpInputType) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }],
    },
  });

  if (!user || !user.password) throw new AppError("Invalid credentials");

  await prisma.oTPVerification.deleteMany({
    where: {
      userId: user.id,
    },
  });

  if (user.isVerified) throw new AppError("Already Verified");

  const otp = generateOtp();

  await prisma.oTPVerification.create({
    data: {
      userId: user.id,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  if (!user.email) {
    throw new AppError("User email is not Valid.");
  }

  await sendEmail(user.email, otp);

  return { message: "Verification Email Sent" };
};

export const verifyOtp = async (data: OtpVerifyInput) => {
  const record = await prisma.oTPVerification.findFirst({
    where: { userId: data.userId, otp: data.otp, verified: false },
  });

  if (!record || record.expiresAt < new Date()) {
    throw new AppError("Invalid or expired OTP");
  }

  await prisma.$transaction([
    prisma.oTPVerification.delete({
      where: { id: record.id },
    }),
    prisma.user.update({
      where: { id: data.userId },
      data: { isVerified: true },
    }),
  ]);
  return { message: "Account verified" };
};

export const refreshToken = async (token: string) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const stored = await prisma.refreshToken.findUnique({
    where: { token: hashedToken },
  });

  if (!stored || stored.revoked) {
    throw new AppError('Invalid refresh token');
  }

  const user = await prisma.user.findUnique({
    where: { id: stored.userId },
  });

  if (!user) throw new AppError('User not found');

  const jwtPayload: jwtPayloadType = {
    userId: user.id,
  };

  return {
    accessToken: generateAccessToken(jwtPayload),
  };
};

export const logOut = async (HashedToken: string) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(HashedToken)
    .digest('hex');

  const stored = await prisma.refreshToken.delete({
    where: { token: hashedToken },
  });

  if (!stored || stored.revoked) {
    throw new AppError('Invalid refresh token');
  }
};