/*
  Warnings:

  - You are about to drop the column `endYear` on the `WorkExperience` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `WorkExperience` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "endYear",
DROP COLUMN "startYear",
ADD COLUMN     "endDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "SkillType";
