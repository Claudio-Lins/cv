import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { updateWorkExperience } from "@/actions/work-experience-action"
import { WorkExperienceSchema } from "@/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { $Enums } from "@prisma/client"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState, useTransition } from "react"

import { Loader } from "lucide-react"
import { Controller, FieldError, useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import type { WorkExperienceTypes } from "../../../@types/resume-types"
import { RichTextEditor } from "../rich-texte-ditor"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Separator } from "../ui/separator"
import { MyInput } from "./my-input"

type WorkExperienceFormData = z.infer<typeof WorkExperienceSchema>

interface WorkExperienceProps {
  workExperience: WorkExperienceTypes
  setIsOpenEditWorkExperience: (value: boolean) => void
}

export function UpdateWorkExperienceForm({
  workExperience,
  setIsOpenEditWorkExperience,
}: WorkExperienceProps) {
  if (!setIsOpenEditWorkExperience) {
    throw new Error("setIsOpenEdit is not a valid function")
  }
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof WorkExperienceSchema>>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      title: workExperience.title,
      description: workExperience.description || "",
      company: workExperience.company,
      location: workExperience.location,
      startDate: workExperience.startDate,
      endDate: workExperience.endDate,
      workLocation: workExperience.workLocation as $Enums.WorkLocation,
      employmentType: workExperience.employmentType as $Enums.EmploymentType,
      link: workExperience.link,
    },
  })

  async function onSubmit(values: WorkExperienceFormData) {
    console.log(errors ? errors : "No errors")
    startTransition(async () => {
      try {
        console.log("Submitting Social form...", values)
        await updateWorkExperience(workExperience?.id, values)
        setIsOpen(false)
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  return (
    <form className="flex w-full flex-col gap-4 py-4">
      <MyInput
        register={register}
        errors={errors as Record<string, FieldError>}
        registerValue="title"
        label="Title"
        placeholder="Title"
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RichTextEditor
            height={300}
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            registerValue="description"
            errors={errors as Record<string, FieldError>}
          />
        )}
      />

      <MyInput
        register={register}
        errors={errors as Record<string, FieldError>}
        registerValue="company"
        label="Company"
        placeholder="Company"
      />
      <MyInput
        register={register}
        errors={errors as Record<string, FieldError>}
        registerValue="location"
        label="Location"
        placeholder="Location"
      />

      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex flex-col space-y-1.5 w-full">
          <Label htmlFor="startDate">Start Date</Label>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                id="startDate"
                placeholder="The start date"
                className="bg-white"
                value={
                  field.value
                    ? new Date(field.value).toISOString().substring(0, 10)
                    : ""
                }
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
            )}
          />
          {errors?.startDate && (
            <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
              {errors?.startDate.message}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-1.5 w-full">
          <Label htmlFor="endDate">End Date</Label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                id="endDate"
                placeholder="The end date"
                className="bg-white"
                value={
                  field.value
                    ? new Date(field.value).toISOString().substring(0, 10)
                    : ""
                }
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
            )}
          />
          {errors?.endDate && (
            <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
              {errors?.endDate.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex flex-col space-y-1.5 w-full">
          <Label>Work Location</Label>
          <Controller
            control={control}
            name={`workLocation`}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Work Location" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values($Enums.WorkLocation).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col space-y-1.5 w-full">
          <Label>Employment Tpe</Label>
          <Controller
            control={control}
            name={`employmentType`}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Employment Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values($Enums.EmploymentType).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <MyInput
        register={register}
        errors={errors as Record<string, FieldError>}
        registerValue="link"
        label="Website"
        placeholder="Website"
      />
      <Separator />
      <div className="">
        <div className="w-full flex items-center justify-between">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="flex items-center gap-2"
          >
            {isPending && <Loader className="animate-spin" size={20} />}
            Edit Work Experience
          </Button>
        </div>
      </div>
    </form>
  )
}
