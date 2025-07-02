/*
  Warnings:

  - Added the required column `sripePriceId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sripePriceId" TEXT NOT NULL;
