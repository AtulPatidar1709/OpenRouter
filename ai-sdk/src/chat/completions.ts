import { BaseClient } from "../client.js";
import { ChatCompletionChunk, ChatCompletionRequest } from "../types/chat.js";
import { streamResponse } from "./stream.js";

export class ChatCompletions {
  constructor(private client: BaseClient) {}

  async create(
    payload: ChatCompletionRequest,
    opts?: { signal?: AbortSignal },
  ): Promise<
    AsyncGenerator<ChatCompletionChunk | "[DONE]"> | Record<string, any>
  > {
    const res = await this.client.fetch("/chat/completions", {
      method: "POST",
      body: JSON.stringify(payload),
      signal: opts?.signal,
    });

    if (!payload.stream) {
      return res.json();
    }

    return streamResponse(res);
  }
}
