/*
  Warnings:

  - The `endDate` column on the `WorkExperience` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startDate` on the `WorkExperience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "startDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" TIMESTAMP(3);
