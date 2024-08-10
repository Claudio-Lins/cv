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
import { AddressSchema } from "@/zodSchema"
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
import { createContact } from "@/actions/contact-action"
import { createAddress } from "@/actions/address-action"

interface CreateAddressFormProps {}

type AddressFormData = z.infer<typeof AddressSchema>

export function CreateAddressForm({}: CreateAddressFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
  })

  async function onSubmit(values: AddressFormData) {
    startTransition(async () => {
      try {
        console.log("Address errors: " + errors)
        await createAddress(values)
        reset()
        setIsOpen(false)
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  return (
    <div className="w-full">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Plus size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Create Address</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4 w-full">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register("title")}
                id="title"
                placeholder="Title of your address"
                className="bg-white"
              />
              {errors?.title && (
                <span
                  className={cn("text-xs font-semibold text-red-600 -mt-2")}
                >
                  {errors?.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="street">Street</Label>
              <Input
                {...register("street")}
                id="street"
                placeholder="Your street"
                className="bg-white"
              />
              {errors?.street && (
                <span
                  className={cn("text-xs font-semibold text-red-600 -mt-2")}
                >
                  {errors?.street.message}
                </span>
              )}
            </div>
            <div className="flex w-full items-center gap-4 flex-col md:flex-row">
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  {...register("city")}
                  id="city"
                  placeholder="City"
                  className="bg-white"
                />
                {errors?.city && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors?.city.message}
                  </span>
                )}
              </div>
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Input
                  {...register("state")}
                  id="state"
                  placeholder="state"
                  className="bg-white"
                />
                {errors?.state && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors?.state.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center gap-4 flex-col md:flex-row">
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  {...register("country")}
                  id="country"
                  placeholder="Country"
                  className="bg-white"
                />
                {errors?.country && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors?.country.message}
                  </span>
                )}
              </div>
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor="zip">Zip</Label>
                <Input
                  {...register("zip")}
                  id="zip"
                  placeholder="zip"
                  className="bg-white"
                />
                {errors?.zip && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors?.zip.message}
                  </span>
                )}
              </div>
            </div>
          </form>
          <Separator />
          <DialogFooter className="">
            <div className="w-full flex items-center justify-between">
              <DialogClose>Cancel</DialogClose>
              <Button onClick={handleSubmit(onSubmit)} type="button">
                Create Address
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
