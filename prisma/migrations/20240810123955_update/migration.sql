/*
  Warnings:

  - A unique constraint covering the columns `[active]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resume_active_key" ON "Resume"("active");
