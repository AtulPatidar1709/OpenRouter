import { NextFunction, Request, Response } from "express";
import { ModelsService } from "./model.service.js";
import { AppError } from "../utils/AppError.js";

export const getAllModels = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providers = await ModelsService.getModels();
    res.status(200).json({ data: providers });
  } catch (error) {
    throw new AppError("Something went wrong while get all Models", 404);
  }
};

export const getProviders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providers = await ModelsService.getProviders();
    res.status(200).json({ data: providers });
  } catch (error) {
    throw new AppError("Something Went Wrong while getting Providers");
  }
};

export const getModelProviders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    if (!id) throw new AppError("Model Id not found", 404);

    const providers = await ModelsService.getModelProviders(id);
    res.status(200).json({ data: providers });
  } catch (error) {
    next(error);
  }
};
