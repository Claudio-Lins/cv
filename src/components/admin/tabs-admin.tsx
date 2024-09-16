"use client"

import { WorkExperience } from "@/components/admin/work-experience"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { useSearchParams } from "next/navigation" // Add this import
import type {
  SocialNetworkTypes,
  WorkExperienceTypes,
} from "../../../@types/resume-types"

interface TabsAdminProps {
  workExperiences: WorkExperienceTypes[]
  // socialNetworks: SocialNetworkTypes[];
}

export function TabsAdmin({
  workExperiences,
}: // socialNetworks,
TabsAdminProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") // Use get method to retrieve the tab
  const defaultTab = tab || "start" // No need for type assertion
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList>
        <TabsTrigger value="start">Start</TabsTrigger>
        <TabsTrigger value="social-network">Social Network</TabsTrigger>
        <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="references">References</TabsTrigger>
      </TabsList>
      <TabsContent value="start">
        <div className="flex items-center h-dvh justify-center w-full">
          <span className="ml-2">Start</span>
        </div>
      </TabsContent>
      <TabsContent value="skills">
        <div className="flex items-center h-dvh justify-center w-full">
          <span className="ml-2">Skills</span>
        </div>
      </TabsContent>
      <TabsContent value="education">
        <div className="flex items-center h-dvh justify-center w-full">
          <span className="ml-2">education</span>
        </div>
      </TabsContent>
      <TabsContent value="references">
        <div className="flex items-center h-dvh justify-center w-full">
          <span className="ml-2">references</span>
        </div>
      </TabsContent>
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
      <div className="flex items-center h-dvh justify-center w-full">
        <span className="ml-2">social-network</span>
      </div>
    </Tabs>
  )
}
