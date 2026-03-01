export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  max_tokens?: number;
};

export type ChatCompletionChunk = {
  choices: Array<{
    delta?: {
      content?: string;
    };
    finish_reason?: "stop" | "credits" | "error";
  }>;
};