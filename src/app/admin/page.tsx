import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { WorkExperience } from "@/components/admin/work-experience"
import { getEducation } from "@/data/educations"
import { getReferences } from "@/data/references"
import { getAllResume } from "@/data/resume"
import { getSkills } from "@/data/skills"
import { getSocialNetworks } from "@/data/social-network"
import { getWorkExperiences } from "@/data/work-experiences"
import type {
  EducationTypes,
  ReferenceTypes,
  ResumeTypes,
  SkillTypes,
  SocialNetworkTypes,
  WorkExperienceTypes,
} from "../../../@types/resume-types"

interface AdminProps {}

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
