export function calculateCreditsUsed({
  inputTokens,
  outputTokens,
  inputCostPer1K,
  outputCostPer1K,
}: {
  inputTokens: number;
  outputTokens: number;
  inputCostPer1K: number;
  outputCostPer1K: number;
}) {
  const cost =
    (inputTokens / 1000) * inputCostPer1K +
    (outputTokens / 1000) * outputCostPer1K;

  return Math.ceil(cost * 100) / 100; // 2 decimal precision
}
