/*
  Warnings:

  - You are about to drop the `_AddressToContact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contactId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AddressToContact" DROP CONSTRAINT "_AddressToContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToContact" DROP CONSTRAINT "_AddressToContact_B_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "contactId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AddressToContact";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
