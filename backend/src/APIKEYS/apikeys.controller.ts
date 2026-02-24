import { ApiKeyService } from "./apikeys.service.js";
import { getUserId } from "../Auth/helper/helper.js";
import { NextFunction, Request, Response } from "express";
import {
  createApiKeyReponse,
  createApiKeySchema,
  DeleteApiKeysSchema,
  updateApiKeysSchema,
} from "./apiKeys.schema.js";

export const createApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);
    const { name } = createApiKeySchema.parse(req.body);
    const result = await ApiKeyService.createApiKey(name, userId);
    res.status(201).json(result as createApiKeyReponse);
  } catch (error) {
    next(error);
  }
};

export const getApiKeys = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);
    const result = await ApiKeyService.getApiKeys(userId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);

    const data = {
      userId,
      ...req.body,
    };

    const {
      id,
      userId: userIdd,
      disabled,
    } = updateApiKeysSchema.parse(data);
    const result = await ApiKeyService.updateApiKeyDisabled(
      id,
      userIdd,
      disabled,
    );

    res.status(201).json({
      message: "Updated api key successfully",
    } as { message: string });
  } catch (error) {
    next(error);
  }
};

export const deleteApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = getUserId(req);

    const data = {
      userId,
      ...req.body,
    };

    const {
      id,
      userId: userIdd,
    } = DeleteApiKeysSchema.parse(data);

    await ApiKeyService.delete(id, userIdd);

    res.status(201).json({
      message: "Api key deleted successfully",
    } as { message : string} );
  } catch (error) {
    next(error);
  }
};