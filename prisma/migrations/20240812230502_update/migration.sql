/*
  Warnings:

  - You are about to drop the `ActiveResume` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `active` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "ActiveResume";
