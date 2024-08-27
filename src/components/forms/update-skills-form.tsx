import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { SkillSchema } from "@/zodSchema"
import * as z from "zod"
import { $Enums } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { createSkill, updateSkill } from "@/actions/skill-action"
import { startTransition, useState } from "react"
import { SkillTypes } from "../../../@types/resume-types"

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
