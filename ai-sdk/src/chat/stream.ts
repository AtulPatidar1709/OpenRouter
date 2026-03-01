import { ChatCompletionChunk } from "../types/chat.js";
import { parseSSE } from "../utils/sse.js";

export async function* streamResponse(
  res: Response,
): AsyncGenerator<ChatCompletionChunk | "[DONE]", void, unknown> {
  for await (const chunk of parseSSE(res)) {
    yield chunk;
  }
}
