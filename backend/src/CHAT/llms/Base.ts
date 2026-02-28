import { Messages } from "./types.js";

export type LlmResponse = {
  completions: {
    choices: {
      message: {
        content: string;
      };
    }[];
  };
  inputTokensConsumed: number;
  outputTokensConsumed: number;
};

export class BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
    maxOutputTokens: Number,
  ): Promise<LlmResponse> {
    throw new Error("Not implemented chat function");
  }
}
