import { createSkill, updateSkill } from "@/actions/skill-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { SkillSchema } from "@/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { $Enums } from "@prisma/client"
import { startTransition, useState } from "react"
import { Controller, FieldError, useForm } from "react-hook-form"
import * as z from "zod"
import { SkillTypes } from "../../../@types/resume-types"
import { RichTextEditor } from "../rich-texte-ditor"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { MyTextArea } from "./my-textArea"

interface UpdateSkillsFormProps {
  skill: SkillTypes
  setIsOpenEdit: (value: boolean) => void
}

type SkillsFormData = z.infer<typeof SkillSchema>

export function UpdateSkillsForm({
  skill,
  setIsOpenEdit,
}: UpdateSkillsFormProps) {
  if (!setIsOpenEdit) {
    throw new Error("setIsOpenEdit is not a valid function")
  }
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SkillsFormData>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      name: skill.name,
      type: skill.type as $Enums.SkillType,
      description: skill.description || "",
    },
  })

  async function onSubmit(values: SkillsFormData) {
    console.log(errors ? errors : "No errors")
    startTransition(async () => {
      try {
        await updateSkill(skill.id, values)
        setIsOpenEdit(false)
        reset()
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  return (
    <>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 py-4 w-full"
      >
        <div className="flex w-full flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name")}
            id="name"
            placeholder="Name of Skill"
            className="bg-white w-full"
          />
          {errors.name && (
            <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
              {errors?.name.message}
            </span>
          )}
        </div>
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RichTextEditor
              height="80%"
              value={field.value || ""}
              onChange={(value) => field.onChange(value)}
              registerValue="description"
              errors={errors as Record<string, FieldError>}
            />
          )}
        />
        {/* <MyTextArea
          max={50}
          min={10}
          showCharacterCount={false}
          register={register}
          errors={errors as Record<string, FieldError>}
          registerValue="description"
          label="Description"
          placeholder="Description of Skill"
        /> */}
        <div className="flex flex-col space-y-1.5 w-full">
          <Label>Type</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Type of Skills" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values($Enums.SkillType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
              {errors?.type.message}
            </span>
          )}
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <Button type="button" onClick={() => setIsOpenEdit(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Edit Skill
          </Button>
        </div>
      </form>
    </>
  )
}
