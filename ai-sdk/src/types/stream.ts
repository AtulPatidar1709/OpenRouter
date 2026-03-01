export type StreamChunk =
  | { choices: { delta?: { content?: string }; finish_reason?: string }[] }
  | "[DONE]";
