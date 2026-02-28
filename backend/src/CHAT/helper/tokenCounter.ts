export function estimateTokensFromText(text: string): number {
  if (!text) return 0;

  // Safe heuristic: ~4 chars per token
  return Math.ceil(text.length / 4);
}
