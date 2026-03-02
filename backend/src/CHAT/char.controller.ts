import { NextFunction, Request, Response } from "express";
import { ChatService } from "./chat.service.js";
import { Messages } from "./llms/types.js";
import { AppError } from "../utils/AppError.js";

export interface getChatInterface {
  model: string;
  apiKey?: string;
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
    const auth = req.headers.authorization;

    const apiKeyHeader = auth?.startsWith("Bearer ")
      ? auth.slice(7)
      : undefined;

    const { model, messages, maxToken, stream }: getChatInterface = req.body;

    const apiKeyBody = req.body.apiKey as string;

    const apiKey = apiKeyBody ?? apiKeyHeader;

    if (!apiKey) throw new AppError("Invalid API Key.", 404);

    if (stream === true) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      await ChatService.getChatResponseStream({
        ...req.body,
        apiKey,
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
