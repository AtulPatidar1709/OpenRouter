import { Router } from "express";

import {
  infoController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  sendOtpController,
  verifyOtpController,
} from "./auth.controller.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/info", requireAuth, infoController);
router.post("/verify-otp", requireAuth, verifyOtpController);
router.post("/send-otp", sendOtpController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutController);

export default router;
