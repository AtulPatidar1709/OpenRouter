import Anthropic from "@anthropic-ai/sdk";
import { ProviderAdapter, streamChatParams } from "../ProviderAdapter.js";
import { config } from "../../../config/config.js";
import { UnifiedStreamChunk } from "../stream.types.js";

const anthropic = new Anthropic({
  apiKey: config.anthropicApiKey,
});

export class ClaudeAdapter implements ProviderAdapter {
  async *streamChat({
    model,
    messages,
    maxOutputTokens,
  }: streamChatParams): AsyncGenerator<UnifiedStreamChunk> {
    try {
      const stream = anthropic.messages.stream({
        model,
        max_tokens: maxOutputTokens,
        messages,
      });

      for await (const event of stream) {
        if (event.type === "content_block_delta") {
          if (event.delta.type === "text_delta") {
            yield {
              delta: event.delta.text,
            };
          }
        }

        if (event.type === "message_stop") {
          yield { done: true };
          break;
        }
      }
    } catch (error) {
      yield { error: "claude_stream_failed" };
      yield { done: true };
    }
  }
}
