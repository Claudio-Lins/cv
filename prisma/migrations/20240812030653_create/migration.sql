-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReferenceToResume" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReferenceToResume_AB_unique" ON "_ReferenceToResume"("A", "B");

-- CreateIndex
CREATE INDEX "_ReferenceToResume_B_index" ON "_ReferenceToResume"("B");

-- AddForeignKey
ALTER TABLE "_ReferenceToResume" ADD CONSTRAINT "_ReferenceToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "Reference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReferenceToResume" ADD CONSTRAINT "_ReferenceToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
