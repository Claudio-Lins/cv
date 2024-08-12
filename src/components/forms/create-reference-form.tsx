"use client"
import { cn } from "@/lib/utils"
import { Plus, PlusCircle } from "lucide-react"
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
import { ReferenceSchema } from "@/zodSchema"
import * as z from "zod"
import { $Enums } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { DialogClose } from "@radix-ui/react-dialog"
import { Separator } from "../ui/separator"
import { createSkill } from "@/actions/skill-action"
import { startTransition, useState } from "react"
import { createReference } from "@/actions/reference-action"
import { MyInput } from "./my-input"

interface CreateReferenceFormProps {}

type ReferenceFormData = z.infer<typeof ReferenceSchema>

export function CreateReferenceForm({}: CreateReferenceFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof ReferenceSchema>>({
    resolver: zodResolver(ReferenceSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
  })

  async function onSubmit(values: ReferenceFormData) {
    console.log(errors ? errors : "No errors")
    startTransition(async () => {
      try {
        await createReference(values)
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
          <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Reference</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4 w-full">
          <MyInput
            register={register}
            errors={errors as Record<string, FieldError>}
            registerValue="name"
            label="Name"
            placeholder="Name"
          />
          <MyInput
            register={register}
            errors={errors as Record<string, FieldError>}
            registerValue="role"
            label="Role"
            placeholder="Role"
          />
          <MyInput
            register={register}
            errors={errors as Record<string, FieldError>}
            registerValue="email"
            label="Email"
            placeholder="Email"
          />
          <MyInput
            register={register}
            errors={errors as Record<string, FieldError>}
            registerValue="phone"
            label="Phone"
            placeholder="Phone"
          />
        </form>
        <Separator />
        <DialogFooter className="">
          <div className="w-full flex items-center justify-between">
            <DialogClose>Cancel</DialogClose>
            <Button onClick={handleSubmit(onSubmit)} type="button">
              Create Reference
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
