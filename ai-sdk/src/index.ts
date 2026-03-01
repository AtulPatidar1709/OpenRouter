import { BaseClient } from "./client.js";
import { ChatCompletions } from "./chat/completions.js";

export class OpenRouterLite {
  chat: {
    completions: ChatCompletions;
  };

  constructor(opts: { apiKey: string; baseURL?: string }) {
    const client = new BaseClient(opts.apiKey, opts.baseURL);
    this.chat = {
      completions: new ChatCompletions(client),
    };
  }
}

export * from "./types/chat.js";
