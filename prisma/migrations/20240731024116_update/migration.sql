/*
  Warnings:

  - You are about to drop the column `socialId` on the `Contact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_socialId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "socialId";

-- CreateTable
CREATE TABLE "_ContactSocials" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactSocials_AB_unique" ON "_ContactSocials"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactSocials_B_index" ON "_ContactSocials"("B");

-- AddForeignKey
ALTER TABLE "_ContactSocials" ADD CONSTRAINT "_ContactSocials_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactSocials" ADD CONSTRAINT "_ContactSocials_B_fkey" FOREIGN KEY ("B") REFERENCES "Social"("id") ON DELETE CASCADE ON UPDATE CASCADE;
