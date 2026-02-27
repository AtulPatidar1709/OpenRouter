import { NextFunction, Request, Response } from "express";
import { ChatService } from "./chat.service.js";
import { Messages } from "./llms/types.js";

export interface getChatInterface {
  model: string;
  apiKey: string;
  messages: Messages;
}

export const getChatResponse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { model, apiKey, messages }: getChatInterface = req.body;

    const result = await ChatService.getChatResponse({
      model,
      apiKey,
      messages,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
