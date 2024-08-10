/*
  Warnings:

  - You are about to drop the column `contactId` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialNetwork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkExperience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EducationToResume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ReferenceToResume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ResumeToSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_contactId_fkey";

-- DropForeignKey
ALTER TABLE "SocialNetwork" DROP CONSTRAINT "SocialNetwork_contactId_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "_EducationToResume" DROP CONSTRAINT "_EducationToResume_A_fkey";

-- DropForeignKey
ALTER TABLE "_EducationToResume" DROP CONSTRAINT "_EducationToResume_B_fkey";

-- DropForeignKey
ALTER TABLE "_ReferenceToResume" DROP CONSTRAINT "_ReferenceToResume_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReferenceToResume" DROP CONSTRAINT "_ReferenceToResume_B_fkey";

-- DropForeignKey
ALTER TABLE "_ResumeToSkill" DROP CONSTRAINT "_ResumeToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResumeToSkill" DROP CONSTRAINT "_ResumeToSkill_B_fkey";

-- DropIndex
DROP INDEX "Resume_contactId_key";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "contactId";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Education";

-- DropTable
DROP TABLE "Reference";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "SocialNetwork";

-- DropTable
DROP TABLE "WorkExperience";

-- DropTable
DROP TABLE "_EducationToResume";

-- DropTable
DROP TABLE "_ReferenceToResume";

-- DropTable
DROP TABLE "_ResumeToSkill";

-- DropEnum
DROP TYPE "EmploymentType";

-- DropEnum
DROP TYPE "SkillType";

-- DropEnum
DROP TYPE "WorkLocation";
