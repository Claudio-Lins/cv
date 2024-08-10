import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getAllResume } from "@/data/resume"
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

async function getSkills() {
  const skills = await prisma.skill.findMany()
  return skills
}
async function getReferences() {
  const references = await prisma.reference.findMany()
  return references
}

async function getContacts() {
  const contacts = await prisma.contact.findMany()
  return contacts
}

async function getAddresses() {
  const addresses = await prisma.address.findMany()
  return addresses
}

export default async function Admin({}: AdminProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const slugs = await getTitle(user?.id!)
  const allResumes = await getAllResume(user?.id!)
  const skills = await getSkills()
  const references = await getReferences()
  const contacts = await getContacts()
  const addresses = await getAddresses()
  return (
    <div className={cn("w-full max-w-7xl mx-auto bg-white")}>
      <Tabs defaultValue={allResumes[0]?.slug!} className="w-full">
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
          <CreateResumeForm
            skills={skills}
            references={references}
            addresses={addresses}
          />
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
