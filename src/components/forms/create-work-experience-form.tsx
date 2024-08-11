"use client"
import { cn } from "@/lib/utils"
import { Contact, Plus, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { WorkExperienceSchema } from "@/zodSchema"
import * as z from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { DialogClose } from "@radix-ui/react-dialog"
import { Separator } from "../ui/separator"
import { startTransition, useState } from "react"
import { Textarea } from "../ui/textarea"
import { $Enums } from "@prisma/client"
import { createWorkExperience } from "@/actions/work-experience-action"
import { DatePicker } from "./date-picker"

type WorkExperienceFormData = z.infer<typeof WorkExperienceSchema>

export function CreateWorkExperienceForm() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof WorkExperienceSchema>>({
    resolver: zodResolver(WorkExperienceSchema),
  })

  async function onSubmit(values: WorkExperienceFormData) {
    console.log(errors ? errors : "No errors")
    startTransition(async () => {
      try {
        console.log("Submitting Social form...", values)
        await createWorkExperience(values)
        // reset()
        setIsOpen(false)
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  const handleDateChangeStart = (date: Date) => {
    setValue("startDate", date)
  }
  const handleDateChangeEnd = (date: Date) => {
    setValue("endDate", date)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create Work Experience</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4 ">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              {...register("title")}
              id="title"
              placeholder="Title of your position"
              className="bg-white"
            />
            {errors?.title && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register(`description`)}
              id="description"
              placeholder="Description of your position"
              className="bg-white"
            />
            {errors?.description && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="company">Company</Label>
            <Input
              {...register(`company`)}
              id="company"
              placeholder="Name of your company"
              className="bg-white"
            />
            {errors?.company && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.company.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              {...register(`location`)}
              id="location"
              placeholder="Ex.: London Area, United Kingdom"
              className="bg-white"
            />
            {errors?.location && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.location.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="startDate">Start Date</Label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => <DatePicker field={field} />}
              />
              {errors?.startDate && (
                <span
                  className={cn("text-xs font-semibold text-red-600 -mt-2")}
                >
                  {errors?.startDate.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="endDate">End Date</Label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => <DatePicker field={field} />}
              />
              {errors?.endDate && (
                <span
                  className={cn("text-xs font-semibold text-red-600 -mt-2")}
                >
                  {errors?.endDate.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <Label>Work Location</Label>
              <Controller
                control={control}
                name={`workLocation`}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="link">Site</Label>
            <Input
              {...register(`link`)}
              id="link"
              placeholder="Ex.: www.companyName.com"
              className="bg-white"
            />
            {errors?.link && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.link.message}
              </span>
            )}
          </div>
          {/* <Button
            variant="destructive"
            size="sm"
            className="ml-auto"
            // onClick={() => deleteWorkExperience(index)}
          >
            Delete Work Experience
          </Button> */}
        </form>
        <Separator />
        <DialogFooter className="">
          <div className="w-full flex items-center justify-between">
            <DialogClose>Cancel</DialogClose>
            <Button onClick={handleSubmit(onSubmit)} type="button">
              Create Work Experience
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
