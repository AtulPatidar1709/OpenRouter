import { GoogleGenAI } from "@google/genai";
import { ProviderAdapter, streamChatParams } from "../ProviderAdapter.js";
import { config } from "../../../config/config.js";

const ai = new GoogleGenAI({
  apiKey: config.googleGeminiApiKey,
});

export class GeminiAdapter implements ProviderAdapter {
  async *streamChat({ model, messages, maxOutputTokens }: streamChatParams) {
    const stream = await ai.models.generateContentStream({
      model,
      contents: messages.map((m) => ({
        role: m.role,
        text: m.content,
      })),
      config: {
        maxOutputTokens,
      },
    });

    for await (const chunk of stream) {
      const text = chunk.text;

      if (text) {
        yield { delta: text };
      }
    }

    yield { done: true };
  }
}
