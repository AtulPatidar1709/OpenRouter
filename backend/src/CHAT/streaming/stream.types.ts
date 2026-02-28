export type UnifiedStreamChunk =
  | { delta: string }
  | { done: true }
  | { error: string };
