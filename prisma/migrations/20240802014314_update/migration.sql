/*
  Warnings:

  - You are about to drop the column `resumeId` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Reference` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Skill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Reference" DROP CONSTRAINT "Reference_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_resumeId_fkey";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "resumeId";

-- AlterTable
ALTER TABLE "Reference" DROP COLUMN "resumeId";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "resumeId";

-- CreateTable
CREATE TABLE "_ResumeToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EducationToResume" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReferenceToResume" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeToSkill_AB_unique" ON "_ResumeToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeToSkill_B_index" ON "_ResumeToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EducationToResume_AB_unique" ON "_EducationToResume"("A", "B");

-- CreateIndex
CREATE INDEX "_EducationToResume_B_index" ON "_EducationToResume"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReferenceToResume_AB_unique" ON "_ReferenceToResume"("A", "B");

-- CreateIndex
CREATE INDEX "_ReferenceToResume_B_index" ON "_ReferenceToResume"("B");

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EducationToResume" ADD CONSTRAINT "_EducationToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EducationToResume" ADD CONSTRAINT "_EducationToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReferenceToResume" ADD CONSTRAINT "_ReferenceToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "Reference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReferenceToResume" ADD CONSTRAINT "_ReferenceToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
