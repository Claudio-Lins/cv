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
import { Contact, Plus, PlusCircle } from "lucide-react"

import { SocialNetworkSchema } from "@/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
// import { $Enums } from "@prisma/client"
import { createSocialNetwork } from "@/actions/social-network-action"
import { DialogClose } from "@radix-ui/react-dialog"
import { startTransition, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Separator } from "../ui/separator"

interface CreateSkillsFormProps {}

type SocialNetworkFormData = z.infer<typeof SocialNetworkSchema>

export function CreateSocialNetworkForm({}: CreateSkillsFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof SocialNetworkSchema>>({
    resolver: zodResolver(SocialNetworkSchema),
  })

  async function onSubmit(values: SocialNetworkFormData) {
    console.log(errors ? errors : "No errors")
    startTransition(async () => {
      try {
        console.log("Submitting Social form...", values)
        await createSocialNetwork(values)
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
          <DialogTitle>Create Social Network</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4 w-full">
          <div className="flex w-full max-w-xs flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              id="country"
              placeholder="Github"
              className="bg-white"
            />
            {errors.name && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.name.message}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col space-y-1.5">
            <Label htmlFor="url">Url</Label>
            <Input
              {...register(`url`)}
              id="url"
              placeholder="Url of your social network"
              className="bg-white"
            />
            {errors?.url && (
              <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
                {errors?.url.message}
              </span>
            )}
          </div>
          <Separator />
          <DialogFooter className="">
            <div className="w-full flex items-center justify-between">
              <DialogClose>Cancel</DialogClose>
              <Button onClick={handleSubmit(onSubmit)} type="button">
                Create Social Network
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
