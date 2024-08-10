-- DropForeignKey
ALTER TABLE "SocialNetwork" DROP CONSTRAINT "SocialNetwork_contactId_fkey";

-- AlterTable
ALTER TABLE "SocialNetwork" ALTER COLUMN "contactId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialNetwork" ADD CONSTRAINT "SocialNetwork_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
