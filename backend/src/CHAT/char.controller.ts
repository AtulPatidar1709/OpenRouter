import { NextFunction, Request, Response } from "express";
import { ChatService } from "./chat.service.js";
import { Messages } from "./llms/types.js";

export interface getChatInterface {
  model: string;
  apiKey: string;
  messages: Messages;
  maxToken?: string;
  stream?: boolean;
  res?: any;
}

export const getChatResponse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { model, apiKey, messages, maxToken, stream }: getChatInterface =
      req.body;

    if (stream === true) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      await ChatService.getChatResponseStream({
        ...req.body,
        res,
      });

      return;
    }

    const result = await ChatService.getChatResponse({
      model,
      apiKey,
      messages,
      maxToken,
      stream,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
