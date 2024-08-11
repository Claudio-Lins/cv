/*
  Warnings:

  - You are about to drop the `_ContactToResume` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContactToResume" DROP CONSTRAINT "_ContactToResume_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactToResume" DROP CONSTRAINT "_ContactToResume_B_fkey";

-- DropTable
DROP TABLE "_ContactToResume";

-- CreateTable
CREATE TABLE "SocialNetwork" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialNetwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResumeToSocialNetwork" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeToSocialNetwork_AB_unique" ON "_ResumeToSocialNetwork"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeToSocialNetwork_B_index" ON "_ResumeToSocialNetwork"("B");

-- AddForeignKey
ALTER TABLE "_ResumeToSocialNetwork" ADD CONSTRAINT "_ResumeToSocialNetwork_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSocialNetwork" ADD CONSTRAINT "_ResumeToSocialNetwork_B_fkey" FOREIGN KEY ("B") REFERENCES "SocialNetwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
