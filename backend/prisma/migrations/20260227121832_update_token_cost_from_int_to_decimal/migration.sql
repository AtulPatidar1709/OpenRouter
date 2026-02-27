/*
  Warnings:

  - You are about to alter the column `creditsConsumed` on the `ApiKey` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,4)`.
  - You are about to alter the column `inputTokenCost` on the `ModelProviderMapping` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,4)`.
  - You are about to alter the column `outputTokenCost` on the `ModelProviderMapping` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,4)`.
  - You are about to alter the column `credits` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,4)`.

*/
-- AlterTable
ALTER TABLE "ApiKey" ALTER COLUMN "creditsConsumed" SET DEFAULT 0,
ALTER COLUMN "creditsConsumed" SET DATA TYPE DECIMAL(10,4);

-- AlterTable
ALTER TABLE "ModelProviderMapping" ALTER COLUMN "inputTokenCost" SET DATA TYPE DECIMAL(10,4),
ALTER COLUMN "outputTokenCost" SET DATA TYPE DECIMAL(10,4);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "credits" SET DEFAULT 1000,
ALTER COLUMN "credits" SET DATA TYPE DECIMAL(10,4);
