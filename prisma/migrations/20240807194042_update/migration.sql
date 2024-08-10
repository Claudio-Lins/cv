/*
  Warnings:

  - You are about to drop the column `addressId` on the `Contact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_addressId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "addressId";

-- CreateTable
CREATE TABLE "_AddressToContact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToContact_AB_unique" ON "_AddressToContact"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToContact_B_index" ON "_AddressToContact"("B");

-- AddForeignKey
ALTER TABLE "_AddressToContact" ADD CONSTRAINT "_AddressToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToContact" ADD CONSTRAINT "_AddressToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
