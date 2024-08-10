-- AlterTable
ALTER TABLE "Reference" ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "endDate" DROP DEFAULT;
