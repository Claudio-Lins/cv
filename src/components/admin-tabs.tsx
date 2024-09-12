"use client"

import { CreateResumeForm } from "@/components/forms/create-resume-form"
import { UpdateResumeForm } from "@/components/forms/update-resume-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { ResumeTypes } from "../../@types/resume-types"
import { ResumeTabContent } from "./resume-tab-content"

interface AdminTabsProps {
  allResumes: Array<any>
  socialNetworks: Array<any>
  workExperiences: Array<any>
  skills: Array<any>
  educations: Array<any>
  references: Array<any>
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
  const defaultTab = useDefaultTab(sortedResumes)

  function useDefaultTab(sortedResumes: ResumeTypes[]) {
    const searchParams = useSearchParams()
    const [defaultTab, setDefaultTab] = useState<string>(sortedResumes[0]?.slug)

    useEffect(() => {
      const newTab = searchParams.get("tab")
      if (newTab && newTab !== defaultTab) {
        setDefaultTab(newTab)
      }
    }, [searchParams, defaultTab])

    return defaultTab
  }

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
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
