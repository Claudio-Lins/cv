-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "startDate" DROP DEFAULT,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
