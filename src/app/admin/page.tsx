import { NavResume } from "@/components/nav-resume"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { UserCardForm } from "@/components/forms/user-card-form"

interface AdminProps {}

async function getTitle(userId: string) {
  const slugs = await prisma.resume.findMany({
    where: {
      userId,
    },
    select: {
      slug: true,
      title: true,
    },
  })
  return slugs
}

async function getResume(userId: string) {
  const resume = await prisma.resume.findMany({
    where: {
      userId,
    },
    include: {
      education: true,
      about: true,
      skills: true,
      user: true,
      contact: {
        include: {
          address: true,
          socials: true,
        },
      },
    },
  })
  return resume
}

export default async function Admin({}: AdminProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const slugs = await getTitle(user?.id!)
  const allResumes = await getResume(user?.id!)
  return (
    <div className={cn("w-full max-w-7xl mx-auto bg-white")}>
      <Tabs defaultValue={allResumes[0].slug!} className="w-full">
        <TabsList>
          {allResumes.map((resume) => (
            <TabsTrigger key={resume.id} value={resume?.slug!}>
              {resume.title}
            </TabsTrigger>
          ))}
          <TabsTrigger key={"add"} value={"add"} asChild>
            <Button variant="default">+ Add Resume</Button>
          </TabsTrigger>
        </TabsList>
        {allResumes.map((resume) => (
          <TabsContent key={resume.slug} value={resume.slug!} className="p-4">
            <UserCardForm user={resume?.user} />
            <pre>{JSON.stringify(resume, null, 2)}</pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
