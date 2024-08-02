import { NavResume } from "@/components/nav-resume"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { UserCardForm } from "@/components/forms/user-card-form"
import { getAllResume } from "@/data/resume"

interface AdminProps {}

async function getTitle(userId: string) {
  const slugs = await prisma.resume.findMany({
    where: {
      userId,
    },
  })
  return slugs
}

export default async function Admin({}: AdminProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const slugs = await getTitle(user?.id!)
  const allResumes = await getAllResume(user?.id!)
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
            <Button variant="default">+ Add Resume</Button>
          </TabsTrigger>
        </TabsList>
        {allResumes.map((resume) => (
          <TabsContent key={resume.slug} value={resume.slug!} className="p-4">
            <pre>{JSON.stringify(resume, null, 2)}</pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
