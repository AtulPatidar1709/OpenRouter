import { GoogleGenAI } from "@google/genai";
import { BaseLlm, LlmResponse } from "./Base.js";
import { Messages } from "./types.js";
import { config } from "../../config/config.js";

const ai = new GoogleGenAI({
  apiKey: config.googleGeminiApiKey,
});

export class Gemini extends BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
    maxOutputTokens: number,
  ): Promise<LlmResponse> {
    const response = await ai.models.generateContent({
      model: model,
      contents: messages.map((message) => ({
        text: message.content,
        role: message.role,
      })),
      config: {
        maxOutputTokens,
      },
    });

    return {
      outputTokensConsumed: response.usageMetadata?.candidatesTokenCount!,
      inputTokensConsumed: response.usageMetadata?.promptTokenCount!,
      completions: {
        choices: [
          {
            message: {
              content: response.text!,
            },
          },
        ],
      },
    };
  }
}
