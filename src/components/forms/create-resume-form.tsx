"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { ResumeSchema } from "@/zodSchema"
import * as z from "zod"
import { Switch } from "../ui/switch"
import { Separator } from "../ui/separator"
import { ResumeTypes } from "../../../@types/resume-types"
import { cn } from "@/lib/utils"
import { startTransition, useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { MinusCircle, MinusIcon, Plus } from "lucide-react"

interface CreateResumeFormProps {}

type ResumeFormData = z.infer<typeof ResumeSchema>

export function CreateResumeForm({}: CreateResumeFormProps) {
  const [output, setOutput] = useState("")
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof ResumeSchema>>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      title: "",
      slug: "",
      active: true,
      firstName: "",
      lastName: "",
      birthday: "",
      pictureUrl: "https://github.com/shadcn.png",
      about: "",
      contact: {
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
          zip: "",
        },
        socialNetworks: [],
      },
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "contact.socialNetworks",
    control,
  })

  // Watch the title field and update the slug field accordingly
  const title = watch("title")

  useEffect(() => {
    if (title) {
      const slug = title.toLowerCase().replace(/\s+/g, "-")
      setValue("slug", slug)
    }
  }, [title, setValue])

  console.log(errors ? errors : "No errors")

  async function createResumeForm(values: ResumeFormData) {
    startTransition(async () => {
      try {
        console.log("Submitting Product form...", values)

        setOutput(JSON.stringify(values, null, 2))
        // reset()
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  function addSocialNetwork() {
    append({ name: "", url: "" })
  }
  function removeSocialNetwork(index: number) {
    remove(index)
  }

  return (
    <>
      <form onSubmit={handleSubmit(createResumeForm)} className={cn("")}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create a Resume</CardTitle>
            <CardDescription className="">
              <span className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                accusantium quidem harum odio id veritatis adipisci deleniti
                vero aliquam dolore voluptatum ipsam.
              </span>
            </CardDescription>
          </CardHeader>
          <Separator className="w-[97%] mx-auto" />
          <CardContent>
            <div className="grid w-full items-center gap-4 mt-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  {...register("title")}
                  id="title"
                  placeholder="Title of your resume"
                  className="bg-white"
                />
                {errors.title && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center gap-4 flex-col md:flex-row">
                <div className="flex w-full flex-col space-y-1.5">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    placeholder="First Name"
                    className="bg-white"
                  />
                  {errors.firstName && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    {...register("lastName")}
                    id="lastName"
                    placeholder="Last name"
                    className="bg-white"
                  />
                  {errors.lastName && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  type="date"
                  {...register("birthday")}
                  id="birthday"
                  placeholder="Birthday"
                  className="bg-white"
                />
                {errors.birthday && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors.birthday.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="about">About</Label>
                <Textarea
                  {...register("about")}
                  id="about"
                  placeholder="About"
                  className="bg-white"
                />
                {errors.about && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors.about.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-4">
                <h3 className="font-bold text-lg">Contact</h3>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("contact.email")}
                    id="email"
                    placeholder="Your email"
                    className="bg-white"
                  />
                  {errors.contact?.email && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors?.contact?.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    {...register("contact.phone")}
                    id="phone"
                    placeholder="Your phone"
                    className="bg-white"
                  />
                  {errors.contact?.phone && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors?.contact?.phone.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    {...register("contact.address.street")}
                    id="street"
                    placeholder="Your street"
                    className="bg-white"
                  />
                  {errors.contact?.address?.street && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors?.contact?.address?.street.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full items-center gap-4 flex-col md:flex-row">
                <div className="flex w-full flex-col space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register("contact.address.city")}
                    id="city"
                    placeholder="City"
                    className="bg-white"
                  />
                  {errors.contact?.address?.city && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors?.contact?.address?.city.message}
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input
                    {...register("contact.address.state")}
                    id="state"
                    placeholder="state"
                    className="bg-white"
                  />
                  {errors.contact?.address?.state && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors?.contact?.address?.state.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full items-center gap-4 flex-col md:flex-row">
                <div className="flex w-full flex-col space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    {...register("contact.address.country")}
                    id="country"
                    placeholder="Country"
                    className="bg-white"
                  />
                  {errors.contact?.address?.country && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors?.contact?.address?.country.message}
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col space-y-1.5">
                  <Label htmlFor="zip">Zip</Label>
                  <Input
                    {...register("contact.address.zip")}
                    id="zip"
                    placeholder="zip"
                    className="bg-white"
                  />
                  {errors.contact?.address?.zip && (
                    <span
                      className={cn("text-xs font-semibold text-red-600 -mt-2")}
                    >
                      {errors?.contact?.address?.zip.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-base">Social Network</h3>
                <button
                  type="button"
                  onClick={addSocialNetwork}
                  className=" items-end"
                >
                  <Plus size={24} />
                </button>
              </div>
              <div className="flex w-full items-center gap-4 flex-col ">
                {fields.map((field, index) => {
                  return (
                    <div key={field.id} className="flex flex-col w-full">
                      <div className="flex w-full items-center gap-4">
                        <div className="flex w-full max-w-xs flex-col space-y-1.5">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            {...register(
                              `contact.socialNetworks.${index}.name`
                            )}
                            id="country"
                            placeholder="Github"
                            className="bg-white"
                          />
                          {errors.contact?.socialNetworks?.[index]?.name && (
                            <span
                              className={cn(
                                "text-xs font-semibold text-red-600 -mt-2"
                              )}
                            >
                              {
                                errors.contact?.socialNetworks?.[index]?.name
                                  .message
                              }
                            </span>
                          )}
                        </div>
                        <div className="flex w-full flex-col space-y-1.5">
                          <Label htmlFor="url">Url</Label>
                          <Input
                            {...register(`contact.socialNetworks.${index}.url`)}
                            id="url"
                            placeholder="Url of your social network"
                            className="bg-white"
                          />
                          {errors.contact?.socialNetworks?.[index]?.url && (
                            <span
                              className={cn(
                                "text-xs font-semibold text-red-600 -mt-2"
                              )}
                            >
                              {
                                errors.contact?.socialNetworks?.[index]?.url
                                  .message
                              }
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSocialNetwork(index)}
                          className="flex justify-end items-end pt-4"
                        >
                          <MinusCircle className="text-red-500" size={24} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
          <Separator className="w-[97%] mx-auto" />
          <CardFooter className="flex mt-6 justify-between">
            <Button type="submit" className="">
              Create Resume
            </Button>
          </CardFooter>
        </Card>
      </form>
      <pre>{output}</pre>
    </>
  )
}
