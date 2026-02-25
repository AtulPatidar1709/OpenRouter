import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';

import authRoutes from "./Auth/auth.routes.js";
import chatRoutes from "./CHAT/chat.routes.js";
import apiRoutes from "./APIKEYS/apikeys.routes.js";
import modelRoutes from "./MODELS/model.routes.js";

import { globalErrorHandler } from './middleware/globalErrorHandler.js';

const app = express();

app.use(
  cors({
    origin: [config.frontendDomain!, config.buildDomain!],
    credentials: true,
  }),
);

app.use(cookieParser(config.cookieSecret));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Router API Server is running',
    version: '1.0.0',
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/apikey", apiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/model", modelRoutes);

app.use(globalErrorHandler);

export { app };8