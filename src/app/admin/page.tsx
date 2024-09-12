import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { AdminTabs } from "@/components/admin-tabs"
import { getAllResume } from "@/data/resume"

interface AdminProps {}

async function getSkills() {
  const skills = await prisma.skill.findMany()
  return skills
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
  const allResumes = await getAllResume(user?.id!)
  const skills = await getSkills()
  const socialNetworks = await getSocialNetworks()
  const workExperiences = await getWorkExperiences()
  const educations = await getEducation()
  const references = await getReferences()

  return (
    <div className={cn("w-full max-w-7xl mt-20 mx-auto bg-white")}>
      <AdminTabs
        allResumes={allResumes}
        socialNetworks={socialNetworks}
        workExperiences={workExperiences}
        skills={skills}
        educations={educations}
        references={references}
      />
    </div>
  )
}
