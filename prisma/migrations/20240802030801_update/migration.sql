/*
  Warnings:

  - Added the required column `role` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialNetwork" ADD COLUMN     "referenceId" TEXT;

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialNetwork" ADD CONSTRAINT "SocialNetwork_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "Reference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
