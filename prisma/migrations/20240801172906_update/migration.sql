/*
  Warnings:

  - Changed the type of `type` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('TECHNICAL', 'PERSONAL', 'SOFTSKILL', 'HOBBIES', 'HARDSKILL');

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "type",
ADD COLUMN     "type" "SkillType" NOT NULL;
