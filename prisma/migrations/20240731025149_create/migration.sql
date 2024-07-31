/*
  Warnings:

  - You are about to drop the column `resumeId` on the `Education` table. All the data in the column will be lost.
  - Changed the type of `startYear` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endYear` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_resumeId_fkey";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "resumeId",
DROP COLUMN "startYear",
ADD COLUMN     "startYear" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endYear",
ADD COLUMN     "endYear" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_EducationToResume" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EducationToResume_AB_unique" ON "_EducationToResume"("A", "B");

-- CreateIndex
CREATE INDEX "_EducationToResume_B_index" ON "_EducationToResume"("B");

-- AddForeignKey
ALTER TABLE "_EducationToResume" ADD CONSTRAINT "_EducationToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EducationToResume" ADD CONSTRAINT "_EducationToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
