/*
  Warnings:

  - Added the required column `city` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;
