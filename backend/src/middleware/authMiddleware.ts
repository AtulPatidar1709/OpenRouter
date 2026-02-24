import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/AuthenticatedRequestTypes.js';
import { AppError } from '../utils/AppError.js';
import { config } from '../config/config.js';
import { isJwtPayload } from '../types/isJwtPayload.js';

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.signedCookies?.accessToken;

    console.log("Token is here ", token);

    if (!token) {
      throw new AppError('Not logged in', 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret!) as unknown;

    console.log("Decode code is ", decoded);

    // Use type guard
    if (!isJwtPayload(decoded)) {
      throw new AppError('Invalid token payload', 401);
    }

    console.log("Decoded ", decoded.sub);

    req.user = {
      userId: decoded.sub,
    };

    next();
  } catch (err: unknown) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401));
    }

    if (err instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expired', 401));
    }

    next(err);
  }
};
