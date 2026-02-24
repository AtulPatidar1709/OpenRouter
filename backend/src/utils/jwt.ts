import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const generateAccessToken = (user: { userId: string }) =>
  jwt.sign({ sub: user.userId }, config.jwtSecret!, { expiresIn: "15m",});

export const generateRefreshToken = (user: { userId: string }) =>
  jwt.sign({ sub: user.userId }, config.jwtRefreshSecret!, { expiresIn: '7d' });
