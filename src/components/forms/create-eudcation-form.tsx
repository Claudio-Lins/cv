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
import { useForm, useFieldArray, Controller, FieldError } from "react-hook-form"
import { EducationSchema, WorkExperienceSchema } from "@/zodSchema"
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
import { MyInput } from "./my-input"
import { MyTextArea } from "./my-textArea"
import { createEducation } from "@/actions/education-action"

type EducationFormData = z.infer<typeof EducationSchema>

export function CreateEducationForm() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof EducationSchema>>({
    resolver: zodResolver(EducationSchema),
  })

  async function onSubmit(values: EducationFormData) {
    console.log(errors ? errors : "No errors")
    startTransition(async () => {
      try {
        console.log("Submitting Social form...", values)
        await createEducation(values)
        // reset()
        setIsOpen(false)
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus size={24} />
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
            registerValue="school"
            label="School"
            placeholder="School"
          />
          <MyInput
            register={register}
            errors={errors as Record<string, FieldError>}
            registerValue="field"
            label="Field"
            placeholder="Field name of study"
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
              Create Education
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
