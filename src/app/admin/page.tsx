import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getAllResume } from "@/data/resume"
import { CreateResumeForm } from "@/components/forms/create-resume-form"
import { UpdateResumeForm } from "@/components/forms/update-resume-form"

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

async function getSkill(id: string) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  })
  return skill
}
async function getReferences() {
  const references = await prisma.reference.findMany()
  return references
}

async function getEducation() {
  const educations = await prisma.education.findMany()
  return educations
}

async function getSocialNetworks() {
  const socialNetworks = await prisma.socialNetwork.findMany()
  return socialNetworks
}

async function getWorkExperiences() {
  const workExperiences = await prisma.workExperience.findMany()
  return workExperiences.map((experience) => ({
    ...experience,
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : null,
  }))
}

export default async function Admin({}: AdminProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const slugs = await getTitle(user?.id!)
  const allResumes = await getAllResume(user?.id!)
  const skills = await getSkills()
  const skill = await getSkill(skills[0]?.id!)
  const socialNetworks = await getSocialNetworks()
  const workExperiences = await getWorkExperiences()
  const educations = await getEducation()
  const references = await getReferences()

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
            socialNetworks={socialNetworks}
            workExperiences={workExperiences}
            skills={skills}
            educations={educations}
            references={references}
          />
        </TabsContent>
        {allResumes.map((resume) => (
          <TabsContent key={resume.slug} value={resume.slug!} className="p-4">
            {resume ? (
              <UpdateResumeForm
                resume={resume}
                socialNetworks={socialNetworks}
                workExperiences={workExperiences}
                skills={skills}
                educations={educations}
                references={references}
              />
            ) : (
              <p>Loading...</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
