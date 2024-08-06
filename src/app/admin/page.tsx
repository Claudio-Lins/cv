import { NavResume } from "@/components/nav-resume"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getAllResume } from "@/data/resume"
import { ResumeTypes, SkillTypes } from "../../../@types/resume-types"
import { ResumeEditCard } from "@/components/forms/resume-edit-card"
import { CreateResumeForm } from "@/components/forms/create-resume-form"

interface AdminProps {}

async function getTitle(userId: string) {
  const slugs = await prisma.resume.findMany({
    where: {
      userId,
    },
  })
  return slugs
}

async function getSkills(userId: string) {
  const skills = await prisma.resume.findMany({
    where: {
      userId,
    },
    select: {
      skills: true,
    },
  })
  return skills.map((skill) => skill.skills).flat()
}

export default async function Admin({}: AdminProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const slugs = await getTitle(user?.id!)
  const allResumes = await getAllResume(user?.id!)
  const skills = await getSkills(user?.id!)
  return (
    <div className={cn("w-full max-w-7xl mx-auto bg-white")}>
      <Tabs defaultValue={allResumes[0].slug!} className="w-full">
        <TabsList>
          {allResumes.map((resume) => (
            <TabsTrigger key={resume?.slug} value={resume?.slug!}>
              {resume.title}
            </TabsTrigger>
          ))}
          <TabsTrigger key={"add"} value={"add"} asChild>
            <Button variant="outline">+ Add Resume</Button>
          </TabsTrigger>
        </TabsList>
        <TabsContent key={"add"} value={"add"} className="p-4">
          <CreateResumeForm skills={skills} />
        </TabsContent>
        {allResumes.map((resume) => (
          <TabsContent key={resume.slug} value={resume.slug!} className="p-4">
            <pre>{JSON.stringify(resume, null, 2)}</pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
