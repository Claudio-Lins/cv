/*
  Warnings:

  - You are about to drop the column `contactId` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_contactId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "contactId";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "addressId" TEXT NOT NULL;
