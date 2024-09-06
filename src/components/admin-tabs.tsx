"use client"

import { CreateResumeForm } from "@/components/forms/create-resume-form"
import { UpdateResumeForm } from "@/components/forms/update-resume-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"

interface AdminTabsProps {
  allResumes: Array<any>
  socialNetworks: Array<any>
  workExperiences: Array<any>
  skills: Array<any>
  educations: Array<any>
  references: Array<any>
}

export default function AdminTabs({
  allResumes,
  socialNetworks,
  workExperiences,
  skills,
  educations,
  references,
}: AdminTabsProps) {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || allResumes[0]?.slug! // Define a aba com base na query string ou a primeira aba

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList>
        {allResumes
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })
          .map((resume) => (
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
      {allResumes
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        })
        .map((resume) => (
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
  )
}
