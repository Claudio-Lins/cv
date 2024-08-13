/*
  Warnings:

  - You are about to drop the column `email` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `title` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "email",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "birthday" DROP NOT NULL;
