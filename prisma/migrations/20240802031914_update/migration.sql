/*
  Warnings:

  - You are about to drop the column `role` on the `WorkExperience` table. All the data in the column will be lost.
  - Added the required column `description` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workLocation` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FREELANCER', 'VOLUNTEER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "WorkLocation" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "role",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL,
ADD COLUMN     "workLocation" "WorkLocation" NOT NULL;
