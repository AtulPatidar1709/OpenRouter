import { NextFunction, Request, Response } from "express";
import { getUserId } from "../Auth/helper/helper.js";
import { WalletService } from "./wallet.service.js";
import { AppError } from "../utils/AppError.js";

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
