import { Messages } from "../llms/types.js";
import { UnifiedStreamChunk } from "./stream.types.js";

export interface ProviderStreamChunk {
  delta?: string;
  done?: boolean;
}

export interface streamChatParams {
  model: string;
  messages: Messages;
  maxOutputTokens: number;
  signal: AbortSignal;
}

export interface ProviderAdapter {
  streamChat(params: streamChatParams): AsyncGenerator<UnifiedStreamChunk>;
}
