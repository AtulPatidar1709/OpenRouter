import { NextFunction, Request, Response } from "express";
import { getUserId } from "../Auth/helper/helper.js";
import { verifyRazorpayPayment, WalletService } from "./wallet.service.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequestTypes.js";
import { verifyRazorpayPaymentSchema } from "./wallet.schema.js";
import { AppError } from "../utils/AppError.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";
import { prisma } from "../config/prisma.js";

export const getWalletTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);
    const data = await WalletService.getAllWalletTransaction(userId);
    return res.status(200).json({
      message: "Fectch Succesfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const initiatePaymentController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);
    const amount = req.body.amount;
    const result = await WalletService.initiatePayment(userId, amount);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);

    const {
      walletIdDetails,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = verifyRazorpayPaymentSchema.parse(req.body);

    const result = await verifyRazorpayPayment(
      userId,
      walletIdDetails,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    );

    res.status(200).json({
      status: "success",
      message: "Payment verified successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchRazorPayOrderHook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const received_signature = req.get("x-razorpay-signature");
    const webHookSecret = config.rzpTestWebhookSecret;

    if (!received_signature || !webHookSecret) {
      console.error("Missing signature or secret");
      return next(new AppError("Invalid signature or missing secret", 404));
    }

    const rawBody = req.body.toString("utf8");

    const isValidSignature = validateWebhookSignature(
      rawBody,
      received_signature,
      webHookSecret,
    );

    if (!isValidSignature) {
      console.error("❌ Signature verification failed!");
      return next(new AppError("Webhook signature verification failed", 404));
    }

    const payload = JSON.parse(rawBody);

    const orderEntity = payload.payload.order.entity;
    const paymentEntity = payload.payload.payment.entity;
    const walletId = paymentEntity.notes.walletIdDetails;

    if (!orderEntity || orderEntity.status !== "paid") {
      return new AppError("Order not paid", 404);
    }

    if (!paymentEntity) {
      new AppError("Payment details missing", 404);
    }

    if (!walletId) new AppError("Wallet is not found", 404);

    const razorpayPaymentId = paymentEntity.id;

    // Update order
    const walletDetails = await prisma.walletTransaction.update({
      where: {
        id: walletId,
      },
      data: {
        status: "SUCCESS",
        provider: "RAZORPAY",
        providerOrderId: orderEntity.id,
        providerPaymentId: razorpayPaymentId,
        providerSignature: received_signature,
      },
    });

    if (!walletDetails) {
      return res.status(404).json({ error: "walletDetails not found" });
    }

    res.status(200).json({
      status: "success",
      message: "walletDetails placed successfully",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(200).send("OK");
  }
};
