import OpenAI from "openai";
import { ProviderAdapter, streamChatParams } from "../ProviderAdapter.js";
import { config } from "../../../config/config.js";
import { UnifiedStreamChunk } from "../stream.types.js";

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export class OpenAIAdapter implements ProviderAdapter {
  async *streamChat({
    model,
    messages,
    maxOutputTokens,
  }: streamChatParams): AsyncGenerator<UnifiedStreamChunk> {
    try {
      const stream = await openai.chat.completions.create({
        model,
        messages,
        max_tokens: maxOutputTokens,
        stream: true,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;

        if (delta) {
          yield { delta };
        }

        if (chunk.choices[0]?.finish_reason) {
          yield { done: true };
          break;
        }
      }
    } catch (error) {
      yield { error: "openai_stream_failed" };
      yield { done: true };
    }
  }
}
