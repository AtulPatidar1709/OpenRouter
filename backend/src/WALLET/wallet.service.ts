import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";

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
}
