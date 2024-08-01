-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResumeToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeToSkill_AB_unique" ON "_ResumeToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeToSkill_B_index" ON "_ResumeToSkill"("B");

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
