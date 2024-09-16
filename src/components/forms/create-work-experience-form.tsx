"use client"
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
import { cn } from "@/lib/utils"
import { Contact, Loader, Plus, PlusCircle } from "lucide-react"

import { createWorkExperience } from "@/actions/work-experience-action"
import { WorkExperienceSchema } from "@/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { $Enums } from "@prisma/client"
import { DialogClose } from "@radix-ui/react-dialog"
import { startTransition, useState, useTransition } from "react"
import { Controller, FieldError, useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { PlusIcon } from "../icons/plus-icon"
import { RichTextEditor } from "../rich-texte-ditor"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import { DatePicker } from "./date-picker"
import { MyInput } from "./my-input"
import { MyTextArea } from "./my-textArea"

type WorkExperienceFormData = z.infer<typeof WorkExperienceSchema>

export function CreateWorkExperienceForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
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
          <PlusIcon width={24} height={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-none sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Work Experience</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 py-4">
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

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
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
          <MyInput
            register={register}
            errors={errors as Record<string, FieldError>}
            registerValue="link"
            label="Website"
            placeholder="Website"
          />
          <Separator />
          <DialogFooter className="">
            <div className="w-full flex items-center justify-between">
              <DialogClose>Cancel</DialogClose>
              <Button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="flex items-center gap-2"
              >
                <Loader
                  className={cn("hidden", isPending && "block animate-spin")}
                />
                <span>Create Work Experience</span>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
