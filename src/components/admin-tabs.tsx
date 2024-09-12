"use client"

import { CreateResumeForm } from "@/components/forms/create-resume-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type {
  EducationTypes,
  ReferenceTypes,
  ResumeTypes,
  SkillTypes,
  SocialNetworkTypes,
  WorkExperienceTypes,
} from "../../@types/resume-types"
import { ResumeTabContent } from "./resume-tab-content"

interface AdminTabsProps {
  allResumes: ResumeTypes[]
  socialNetworks: SocialNetworkTypes[]
  workExperiences: WorkExperienceTypes[]
  skills: SkillTypes[]
  educations: EducationTypes[]
  references: ReferenceTypes[]
}

function sortResumesByDate(resumes: ResumeTypes[]): ResumeTypes[] {
  return resumes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function AdminTabs({
  allResumes,
  socialNetworks,
  workExperiences,
  skills,
  educations,
  references,
}: AdminTabsProps) {
  const searchParams = useSearchParams()
  const sortedResumes = sortResumesByDate(allResumes)
  const [defaultTab, setDefaultTab] = useState<string>(
    sortedResumes[0]?.slug || "add"
  )

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab")
    if (tabFromUrl) {
      setDefaultTab(tabFromUrl)
    }
  }, [searchParams])

  return (
    <Tabs
      defaultValue={defaultTab}
      value={defaultTab}
      onValueChange={setDefaultTab}
      className="w-full"
    >
      <TabsList>
        {sortedResumes.map((resume) => (
          <TabsTrigger key={resume.slug} value={resume.slug}>
            {resume.title}
          </TabsTrigger>
        ))}
        <TabsTrigger key={"add"} value={"add"} asChild>
          <Button variant="outline">+ Add Resume</Button>
        </TabsTrigger>
      </TabsList>
      {sortedResumes.map((resume) => (
        <ResumeTabContent
          key={resume.slug}
          resume={resume}
          socialNetworks={socialNetworks}
          workExperiences={workExperiences}
          skills={skills}
          educations={educations}
          references={references}
        />
      ))}
      <TabsContent key={"add"} value={"add"} className="p-4">
        <CreateResumeForm
          socialNetworks={socialNetworks}
          workExperiences={workExperiences}
          skills={skills}
          educations={educations}
          references={references}
        />
      </TabsContent>
    </Tabs>
  )
}
