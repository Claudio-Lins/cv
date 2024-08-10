/*
  Warnings:

  - You are about to drop the column `resumeId` on the `Contact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_resumeId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "resumeId";

-- CreateTable
CREATE TABLE "_ContactToResume" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToResume_AB_unique" ON "_ContactToResume"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToResume_B_index" ON "_ContactToResume"("B");

-- AddForeignKey
ALTER TABLE "_ContactToResume" ADD CONSTRAINT "_ContactToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToResume" ADD CONSTRAINT "_ContactToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
