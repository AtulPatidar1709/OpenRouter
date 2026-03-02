import { Prisma } from "../generated/prisma/client.js";

export function calculateCreditsUsed({
  inputTokens,
  outputTokens,
  inputCostPer1K,
  outputCostPer1K,
}: {
  inputTokens: number;
  outputTokens: number;
  inputCostPer1K: Prisma.Decimal; // ₹ per 1K
  outputCostPer1K: Prisma.Decimal; // ₹ per 1K
}) {
  const inputCostRupees = new Prisma.Decimal(inputTokens)
    .div(1000)
    .mul(inputCostPer1K);

  const outputCostRupees = new Prisma.Decimal(outputTokens)
    .div(1000)
    .mul(outputCostPer1K);

  const totalPaise = inputCostRupees.plus(outputCostRupees).mul(100);

  return totalPaise.ceil().toNumber(); // integer paise
}
