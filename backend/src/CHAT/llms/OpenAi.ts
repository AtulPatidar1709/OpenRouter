import OpenAI from "openai";
import { Messages } from "./types.js";
import { BaseLlm, LlmResponse } from "./Base.js";
import { config } from "../../config/config.js";

const client = new OpenAI({
  apiKey: config.openaiApiKey,
});

export class OpenAi extends BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
    maxOutputToken: number,
  ): Promise<LlmResponse> {
    const response = await client.responses.create({
      model: model,
      input: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      max_output_tokens: maxOutputToken,
    });

    return {
      inputTokensConsumed: response.usage?.input_tokens!,
      outputTokensConsumed: response.usage?.output_tokens!,
      completions: {
        choices: [
          {
            message: {
              content: response.output_text,
            },
          },
        ],
      },
    };
  }
}
