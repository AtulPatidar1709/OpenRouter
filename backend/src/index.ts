import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/config.js";

import authRoutes from "./Auth/auth.routes.js";
import chatRoutes from "./CHAT/chat.routes.js";
import apiRoutes from "./APIKEYS/apikeys.routes.js";
import modelRoutes from "./MODELS/model.routes.js";
import walletRoutes from "./WALLET/wallet.routes.js";

import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

const app = express();

app.use(
  cors({
    origin: [config.frontendDomain!, config.buildDomain!],
    credentials: true,
  }),
);

app.use(helmet());

app.use(limiter);

app.use(cookieParser(config.cookieSecret));

app.use(
  "/api/wallet/payment-verify",
  express.raw({ type: "application/json" }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Router API Server is running",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/apikey", apiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/model", modelRoutes);
app.use("/api/wallet", walletRoutes);

app.use(globalErrorHandler);

export { app };
