/*
  Warnings:

  - You are about to drop the column `referenceId` on the `SocialNetwork` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SocialNetwork" DROP CONSTRAINT "SocialNetwork_referenceId_fkey";

-- AlterTable
ALTER TABLE "SocialNetwork" DROP COLUMN "referenceId";

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "link" TEXT;
