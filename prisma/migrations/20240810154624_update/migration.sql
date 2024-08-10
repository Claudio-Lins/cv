/*
  Warnings:

  - You are about to drop the column `addressId` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `contactId` on table `Resume` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_contactId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "contactId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "addressId";

-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "contactId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Resume_contactId_key" ON "Resume"("contactId");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
