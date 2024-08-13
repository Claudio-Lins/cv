/*
  Warnings:

  - You are about to drop the column `active` on the `Resume` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Resume_active_key";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "active";

-- CreateTable
CREATE TABLE "ActiveResume" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "resumeId" TEXT NOT NULL,

    CONSTRAINT "ActiveResume_pkey" PRIMARY KEY ("id")
);
