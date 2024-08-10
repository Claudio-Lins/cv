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
import { useForm, useFieldArray, Controller } from "react-hook-form"
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
          <DialogTitle>Create Skills</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4 w-full">
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
          <div className="flex w-full flex-col space-y-1.5">
            <Label htmlFor="role">Role</Label>
            <Input
              {...register("role")}
              id="role"
              placeholder="Type your role"
              className="bg-white w-full"
            />
            {errors.role && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.role.message}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="Type your email"
              className="bg-white w-full"
              inputMode="email"
            />
            {errors.email && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.email.message}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              {...register("phone")}
              id="phone"
              placeholder="Type your phone"
              className="bg-white w-full"
              inputMode="tel"
            />
            {errors.phone && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.phone.message}
              </span>
            )}
          </div>
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
