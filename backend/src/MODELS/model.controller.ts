import { NextFunction, Request, Response } from "express";
import { ModelsService } from "./model.service.js";
import { AppError } from "../utils/AppError.js";
import { getModelProvidersResponseSchema, getProvidersResponseType } from "./model.schema.js";

export const getAllModels = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providers = await ModelsService.getModels();
    return {
      providers,
    };
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
    return {
      providers,
    } as getProvidersResponseType;
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
    return {
      providers,
    } as getModelProvidersResponseSchema;
  } catch (error) {
    next(error);
  }
};
