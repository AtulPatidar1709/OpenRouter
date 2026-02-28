import Anthropic from "@anthropic-ai/sdk";
import { BaseLlm, LlmResponse } from "./Base.js";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import { Messages } from "./types.js";
import { config } from "../../config/config.js";

const client = new Anthropic({
  apiKey: config.anthropicApiKey,
});

export class Claude extends BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
    maxOutputToken: number,
  ): Promise<LlmResponse> {
    const response = await client.messages.create({
      max_tokens: maxOutputToken,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      model: model,
    });

    return {
      outputTokensConsumed: response.usage.output_tokens,
      inputTokensConsumed: response.usage.input_tokens,
      completions: {
        choices: response.content.map((content) => ({
          message: {
            content: (content as TextBlock).text,
          },
        })),
      },
    };
  }
}
