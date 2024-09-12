import type {
  EducationTypes,
  ReferenceTypes,
  ResumeTypes,
  SkillTypes,
  SocialNetworkTypes,
  WorkExperienceTypes,
} from "../../@types/resume-types"
import { UpdateResumeForm } from "./forms/update-resume-form"
import { TabsContent } from "./ui/tabs"

interface ResumeTabContentProps {
  resume: ResumeTypes
  socialNetworks: SocialNetworkTypes[]
  workExperiences: WorkExperienceTypes[]
  skills: SkillTypes[]
  educations: EducationTypes[]
  references: ReferenceTypes[]
}

export function ResumeTabContent({
  resume,
  socialNetworks,
  workExperiences,
  skills,
  educations,
  references,
}: ResumeTabContentProps) {
  return (
    <TabsContent key={resume.slug} value={resume.slug} className="p-4">
      <UpdateResumeForm
        resume={resume}
        socialNetworks={socialNetworks}
        workExperiences={workExperiences}
        skills={skills}
        educations={educations}
        references={references}
      />
    </TabsContent>
  )
}
