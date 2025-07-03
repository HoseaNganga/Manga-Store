/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `heroUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "heroUrl_url_key" ON "heroUrl"("url");
