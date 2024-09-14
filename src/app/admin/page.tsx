import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AdminTabs } from "@/components/admin-tabs"
import { WorkExperience } from "@/components/admin/work-experience"
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
        <Tabs defaultValue="work-experience" className="w-full">
          <TabsList>
            <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent
            value="work-experience"
            className="p-4 flex flex-wrap gap-4 justify-center w-full"
          >
            {workExperiences.map((workExperience) => {
              return (
                <WorkExperience
                  key={workExperience.id}
                  workExperience={workExperience}
                />
              )
            })}
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar dados:", error)
    return <div>Erro ao carregar dados</div>
  }
}
