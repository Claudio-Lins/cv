/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FREELANCER', 'VOLUNTEER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "WorkLocation" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- DropTable
DROP TABLE "Contact";

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "employmentType" "EmploymentType" NOT NULL,
    "workLocation" "WorkLocation" NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResumeToWorkExperience" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeToWorkExperience_AB_unique" ON "_ResumeToWorkExperience"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeToWorkExperience_B_index" ON "_ResumeToWorkExperience"("B");

-- AddForeignKey
ALTER TABLE "_ResumeToWorkExperience" ADD CONSTRAINT "_ResumeToWorkExperience_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToWorkExperience" ADD CONSTRAINT "_ResumeToWorkExperience_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
