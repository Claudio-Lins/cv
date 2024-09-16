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
import { Plus, PlusCircle } from "lucide-react"

import { createSkill } from "@/actions/skill-action"
import { SkillSchema } from "@/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { $Enums } from "@prisma/client"
import { DialogClose } from "@radix-ui/react-dialog"
import { startTransition, useState } from "react"
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
import { MyTextArea } from "./my-textArea"

interface CreateSkillsFormProps {}

type SkillsFormData = z.infer<typeof SkillSchema>

export function CreateSkillsForm({}: CreateSkillsFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof SkillSchema>>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      type: $Enums.SkillType.TECHNICAL,
    },
  })

  async function onSubmit(values: SkillsFormData) {
    console.log(errors ? errors : "No errors")
    startTransition(async () => {
      try {
        await createSkill(values)
        reset()
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
          <PlusIcon width={24} height={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Skills</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
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
          {/* <MyTextArea
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
              name={"type"}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          </div>
        </form>
        <Separator />
        <DialogFooter className="">
          <div className="w-full flex items-center justify-between">
            <DialogClose>Cancel</DialogClose>
            <Button onClick={handleSubmit(onSubmit)} type="button">
              Create Skill
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
