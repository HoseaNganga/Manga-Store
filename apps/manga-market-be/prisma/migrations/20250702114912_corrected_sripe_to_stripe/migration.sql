/*
  Warnings:

  - You are about to drop the column `sripePriceId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `stripePriceId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sripePriceId",
ADD COLUMN     "stripePriceId" TEXT NOT NULL;
