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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { $Enums } from "@prisma/client"
import SelectReact from "react-select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { ResumeSchema } from "@/zodSchema"
import * as z from "zod"
import { Switch } from "../ui/switch"
import { Separator } from "../ui/separator"
import { ResumeTypes, SkillTypes } from "../../../@types/resume-types"
import { cn } from "@/lib/utils"
import { startTransition, useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { Check, MinusCircle, MinusIcon, Plus } from "lucide-react"
import { Badge } from "../ui/badge"

interface CreateResumeFormProps {
  skills: SkillTypes[]
}

type ResumeFormData = z.infer<typeof ResumeSchema>

export function CreateResumeForm({ skills }: CreateResumeFormProps) {
  const [output, setOutput] = useState("")
  const [stillWorking, setStillWorking] = useState(false)
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
      workExperiences: [],
      // education: [],
      skills: [],
    },
  })
  const {
    fields: socialNetworkFields,
    append: appendSocialNetwork,
    remove: removeSocialNetwork,
  } = useFieldArray({
    name: "contact.socialNetworks",
    control,
  })

  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    name: "workExperiences",
    control,
  })

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
    appendSocialNetwork({ name: "", url: "" })
  }
  function deleteSocialNetwork(index: number) {
    removeSocialNetwork(index)
  }
  function addWorkExperience() {
    appendWorkExperience({
      title: "",
      description: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "" || null,
      link: "",
      employmentType: $Enums.EmploymentType.EMPLOYEE,
      workLocation: $Enums.WorkLocation.REMOTE,
      isCurrent: stillWorking,
    })
  }

  const endDate = workExperienceFields.map((_, index) =>
    watch(`workExperiences.${index}.endDate`)
  )

  useEffect(() => {
    if (endDate.some((date) => date)) {
      setStillWorking(true)
    } else {
      setStillWorking(false)
    }
  }, [endDate])

  console.log("stillWorking: " + stillWorking)
  console.log("endDate: " + endDate)

  function deleteWorkExperience(index: number) {
    removeWorkExperience(index)
  }

  const groupedSkills = skills.reduce(
    (acc: Record<string, SkillTypes[]>, skill) => {
      if (!acc[skill.type]) {
        acc[skill.type] = []
      }
      acc[skill.type].push(skill)
      return acc
    },
    {}
  )

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
                <h3 className="font-bold text-xl">Contact</h3>
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
                {socialNetworkFields.map((field, index) => {
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
                          onClick={() => deleteSocialNetwork(index)}
                          className="flex justify-end items-end pt-4"
                        >
                          <MinusCircle className="text-red-500" size={24} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="w-full flex flex-col gap-4">
                <h3 className="font-bold text-xl">Work Experience</h3>
                {workExperienceFields.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className="flex flex-col w-full space-y-4"
                    >
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          {...register(`workExperiences.${index}.title`)}
                          id="title"
                          placeholder="Title of your position"
                          className="bg-white"
                        />
                        {errors?.workExperiences?.[index]?.title && (
                          <span
                            className={cn(
                              "text-xs font-semibold text-red-600 -mt-2"
                            )}
                          >
                            {errors?.workExperiences?.[index]?.title.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          {...register(`workExperiences.${index}.description`)}
                          id="description"
                          placeholder="Description of your position"
                          className="bg-white"
                        />
                        {errors?.workExperiences?.[index]?.description && (
                          <span
                            className={cn(
                              "text-xs font-semibold text-red-600 -mt-2"
                            )}
                          >
                            {
                              errors?.workExperiences?.[index]?.description
                                .message
                            }
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          {...register(`workExperiences.${index}.company`)}
                          id="company"
                          placeholder="Name of your company"
                          className="bg-white"
                        />
                        {errors?.workExperiences?.[index]?.company && (
                          <span
                            className={cn(
                              "text-xs font-semibold text-red-600 -mt-2"
                            )}
                          >
                            {errors?.workExperiences?.[index]?.company.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          {...register(`workExperiences.${index}.location`)}
                          id="location"
                          placeholder="Ex.: London Area, United Kingdom"
                          className="bg-white"
                        />
                        {errors?.workExperiences?.[index]?.location && (
                          <span
                            className={cn(
                              "text-xs font-semibold text-red-600 -mt-2"
                            )}
                          >
                            {errors?.workExperiences?.[index]?.location.message}
                          </span>
                        )}
                      </div>
                      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            type="date"
                            {...register(`workExperiences.${index}.startDate`)}
                            id="startDate"
                            placeholder="The start date"
                            className="bg-white"
                          />
                          {errors?.workExperiences?.[index]?.startDate && (
                            <span
                              className={cn(
                                "text-xs font-semibold text-red-600 -mt-2"
                              )}
                            >
                              {
                                errors?.workExperiences?.[index]?.startDate
                                  .message
                              }
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            type="date"
                            {...register(`workExperiences.${index}.endDate`)}
                            id="endDate"
                            placeholder="The end date"
                            className="bg-white w-full"
                          />
                          {errors?.workExperiences?.[index]?.endDate && (
                            <span
                              className={cn(
                                "text-xs font-semibold text-red-600 -mt-2"
                              )}
                            >
                              {
                                errors?.workExperiences?.[index]?.endDate
                                  .message
                              }
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label>Work Location</Label>
                          <Controller
                            control={control}
                            name={`workExperiences.${index}.workLocation`}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Work Location" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values($Enums.WorkLocation).map(
                                    (location) => (
                                      <SelectItem
                                        key={location}
                                        value={location}
                                      >
                                        {location}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label>Employment Tpe</Label>
                          <Controller
                            control={control}
                            name={`workExperiences.${index}.employmentType`}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Employment Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values($Enums.EmploymentType).map(
                                    (location) => (
                                      <SelectItem
                                        key={location}
                                        value={location}
                                      >
                                        {location}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="link">Site</Label>
                        <Input
                          {...register(`workExperiences.${index}.link`)}
                          id="link"
                          placeholder="Ex.: www.companyName.com"
                          className="bg-white"
                        />
                        {errors?.workExperiences?.[index]?.link && (
                          <span
                            className={cn(
                              "text-xs font-semibold text-red-600 -mt-2"
                            )}
                          >
                            {errors?.workExperiences?.[index]?.link.message}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="ml-auto"
                        onClick={() => deleteWorkExperience(index)}
                      >
                        Delete Work Experience
                      </Button>
                    </div>
                  )
                })}
                <div className="w-full flex items-center justify-center mt-8 border-y p-10">
                  <Button type="button" onClick={addWorkExperience}>
                    <Plus size={24} /> Add Work Experience
                  </Button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl">Skills</h3>
                  <button
                    type="button"
                    onClick={addSocialNetwork}
                    className=" items-end"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-4">
                  {skills.length > 0 && (
                    <>
                      {skills.map((skill) => (
                        <Badge
                          variant="outline"
                          className=" flex items-center gap-1"
                          key={skill.id}
                          title={skill.type}
                        >
                          <Controller
                            name="skills"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="checkbox"
                                {...field}
                                value={skill.id}
                                checked={field.value.some(
                                  (s) => s.id === skill.id
                                )}
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...field.value, skill]
                                    : field.value.filter(
                                        (s) => s.id !== skill.id
                                      )
                                  field.onChange(newValue)
                                }}
                              />
                            )}
                          />
                          <span>{skill.name}</span>
                        </Badge>
                      ))}
                    </>
                  )}
                </div>
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
