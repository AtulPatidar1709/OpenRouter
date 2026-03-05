import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import { createRazorpayOrder, rzp } from "./helper.js";
import { config } from "../config/config.js";
import crypto from "crypto";

export abstract class WalletService {
  static async getAllWalletTransaction(userId: string) {
    try {
      return await prisma.walletTransaction.findMany({
        where: {
          userId,
        },
        select: {
          balanceAfter: true,
          amount: true,
          status: true,
          metadata: true,
        },
      });
    } catch (error) {
      throw new AppError("Failed to fetch Transactions", 403);
    }
  }

  static async initiatePayment(userId: string, amount: number) {
    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        credits: true,
      },
    });

    if (!userDetails) throw new AppError("User Not Found", 404);

    const orderData = await createRazorpayOrder(amount, userId);

    const totalCredits = userDetails.credits + amount * 100;

    const walletData = await prisma.walletTransaction.create({
      data: {
        amount: Number(amount),
        type: "CREDIT_TOPUP",
        status: "CREATED",
        userId,
        provider: "RAZORPAY",
        balanceAfter: totalCredits,
        providerOrderId: orderData.id,
      },
    });

    return {
      success: true,
      message: "Payment initiated successfully",
      data: {
        rzorderData: orderData.id,
        walletId: walletData.id,
        amount: walletData.amount,
        paymentMethod: walletData.status,
      },
    };
  }
}

export const verifyRazorpayPayment = async (
  userId: string,
  walletIdDetails: string,
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
) => {
  const walletDetails = await prisma.walletTransaction.findUnique({
    where: { id: walletIdDetails },
    select: {
      amount: true,
    },
  });

  if (!walletDetails) {
    throw new AppError("Payment not found", 404);
  }

  // 🔐 Signature verification (unchanged)
  const keySecret = config.rzpTestKeySecret;
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;

  if (!keySecret) {
    throw new AppError("Razorpay secret missing");
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    throw new AppError("Invalid payment signature", 400);
  }

  const rzOrder = await rzp.orders.fetch(razorpayOrderId);

  if (rzOrder.status !== "paid") {
    throw new AppError("Payment not completed", 400);
  }

  if (!walletDetails) throw new AppError("Wallet Details Not Found ", 404);

  if (Number(rzOrder.amount) !== Number(walletDetails.amount) * 100) {
    throw new AppError("Amount mismatch", 400);
  }

  await prisma.$transaction(async (tx) => {
    const data = await tx.walletTransaction.update({
      where: { id: walletIdDetails },
      data: {
        status: "SUCCESS",
        provider: "RAZORPAY",
        providerOrderId: razorpayOrderId,
        providerPaymentId: razorpayPaymentId,
        providerSignature: razorpaySignature,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        credits: data.balanceAfter,
      },
    });
  });

  return {
    walletIdDetails,
    paymentId: razorpayPaymentId,
  };
};
