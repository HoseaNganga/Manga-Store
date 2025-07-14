-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trending" BOOLEAN NOT NULL DEFAULT false;
