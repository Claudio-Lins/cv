import { CreateResumeForm } from "@/components/forms/create-resume-form"
import { getEducation } from "@/data/educations"
import { getReferences } from "@/data/references"
import { getSkills } from "@/data/skills"
import { getSocialNetworks } from "@/data/social-network"
import { getWorkExperiences } from "@/data/work-experiences"
import { cn } from "@/lib/utils"
import type { ResumeTypes } from "../../../../@types/resume-types"

interface CreateResumeProps {}

export default async function CreateResume({}: CreateResumeProps) {
  try {
    const [skills, socialNetworks, workExperiences, educations, references] =
      await Promise.all([
        getSkills(),
        getSocialNetworks(),
        getWorkExperiences(),
        getEducation(),
        getReferences(),
      ])
    return (
      <div className={cn("w-full max-w-7xl mt-20 mx-auto bg-white")}>
        <CreateResumeForm
          skills={skills}
          socialNetworks={socialNetworks}
          workExperiences={workExperiences}
          educations={educations}
          references={references}
        />
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar dados:", error)
    return <div>Erro ao carregar dados</div>
  }
}
