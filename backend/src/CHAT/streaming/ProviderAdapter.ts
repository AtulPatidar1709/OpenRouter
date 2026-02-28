import { Messages } from "../llms/types.js";

export interface ProviderStreamChunk {
  delta?: string;
  done?: boolean;
}

export interface streamChatParams {
  model: string;
  messages: Messages;
  maxOutputTokens: number;
}

export interface ProviderAdapter {
  streamChat(params: streamChatParams): AsyncGenerator<ProviderStreamChunk>;
}
