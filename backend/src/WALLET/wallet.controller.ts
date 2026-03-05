import { NextFunction, Request, Response } from "express";
import { getUserId } from "../Auth/helper/helper.js";
import { verifyRazorpayPayment, WalletService } from "./wallet.service.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequestTypes.js";
import { verifyRazorpayPaymentSchema } from "./wallet.schema.js";

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
