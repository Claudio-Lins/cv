/*
  Warnings:

  - You are about to drop the column `addressId` on the `Resume` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_addressId_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "addressId" TEXT;

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "addressId";

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
