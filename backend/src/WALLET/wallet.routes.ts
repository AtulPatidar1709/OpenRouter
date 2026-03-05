import { Router } from "express";
import {
  getWalletTransactionController,
  initiatePaymentController,
  verifyPaymentController,
} from "./wallet.controller.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getWalletTransactionController);
router.post("/initiate-payment", requireAuth, initiatePaymentController);
router.post("/verify-payment", requireAuth, verifyPaymentController);

export default router;
