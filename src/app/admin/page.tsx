import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { AdminTabs } from "@/components/admin-tabs"
import { getAllResume } from "@/data/resume"
import type {
  EducationTypes,
  ReferenceTypes,
  ResumeTypes,
  SkillTypes,
  SocialNetworkTypes,
  WorkExperienceTypes,
} from "../../../@types/resume-types"

interface AdminProps {}

async function getSkills(): Promise<SkillTypes[]> {
  return prisma.skill.findMany()
}

async function getReferences(): Promise<ReferenceTypes[]> {
  return prisma.reference.findMany()
}

async function getEducation(): Promise<EducationTypes[]> {
  return prisma.education.findMany()
}

async function getSocialNetworks(): Promise<SocialNetworkTypes[]> {
  return prisma.socialNetwork.findMany()
}

async function getWorkExperiences(): Promise<WorkExperienceTypes[]> {
  const workExperiences = await prisma.workExperience.findMany()
  return workExperiences.map((experience) => ({
    ...experience,
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : null,
  }))
}

export default async function Admin({}: AdminProps) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const [
      allResumes,
      skills,
      socialNetworks,
      workExperiences,
      educations,
      references,
    ] = await Promise.all([
      getAllResume(user?.id!) as Promise<ResumeTypes[]>,
      getSkills(),
      getSocialNetworks(),
      getWorkExperiences(),
      getEducation(),
      getReferences(),
    ])

    return (
      <div className={cn("w-full max-w-7xl mt-20 mx-auto bg-white")}>
        {/* <AdminTabs
          allResumes={allResumes}
          socialNetworks={socialNetworks}
          workExperiences={workExperiences}
          skills={skills}
          educations={educations}
          references={references}
        /> */}
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar dados:", error)
    return <div>Erro ao carregar dados</div>
  }
}
