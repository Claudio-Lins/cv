"use client"

import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { WorkExperienceTypes } from "../../../@types/resume-types"
import { UpdateWorkExperienceForm } from "../forms/update-work-experience-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

interface WorkExperienceProps {
  workExperience: WorkExperienceTypes
}

export function WorkExperience({ workExperience }: WorkExperienceProps) {
  return (
    <div className={cn("w-full max-w-sm")}>
      <Card className=" w-full overflow-hidden">
        <CardHeader className="bg-zinc-900 text-center flex items-center justify-center h-24">
          <CardTitle className="text-white text-ellipsis overflow-hidden">
            {workExperience.title}
          </CardTitle>
        </CardHeader>
        <CardContent className=" mt-4">
          <UpdateWorkExperienceForm
            workExperience={workExperience}
            setIsOpenEditWorkExperience={() => {}}
          />
        </CardContent>
        {/* <Separator className="my-4" />
        <CardFooter className="flex items-center justify-between">
          <Button>Cancel</Button>
          <Button>Delete</Button>
          <Button>Save</Button>
        </CardFooter> */}
      </Card>
    </div>
  )
}
