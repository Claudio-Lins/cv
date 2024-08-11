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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { $Enums } from "@prisma/client"
import SelectReact from "react-select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { ResumeSchema } from "@/zodSchema"
import * as z from "zod"
import { Switch } from "../ui/switch"
import { Separator } from "../ui/separator"
import {
  ResumeTypes,
  SkillTypes,
  ReferenceTypes,
  AddressTypes,
  SocialNetworkTypes,
  ContactTypes,
  WorkExperienceTypes,
} from "../../../@types/resume-types"
import { cn } from "@/lib/utils"
import { startTransition, useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { Check, MinusCircle, MinusIcon, Plus, X, XCircle } from "lucide-react"
import { CreateSkillsForm } from "./create-skills-form"
import { deleteSkill } from "@/actions/skill-action"
import { CreateReferenceForm } from "./create-reference-form"
import { deleteReference } from "@/actions/reference-action"
import { CreateContactForm } from "./create-contact-form"
import { CreateAddressForm } from "./create-address-form"
import { CreateSocialNetworkForm } from "./create-social-form"
import { createResume } from "@/actions/resume-action"
import { deleteSocialNetwork } from "@/actions/social-network-action"
import { CreateWorkExperienceForm } from "./create-work-experience-form"
import { DatePicker } from "./date-picker"

interface CreateResumeFormProps {
  // skills: SkillTypes[]
  // references: ReferenceTypes[]
  // addresses: AddressTypes[]
  socialNetworks: SocialNetworkTypes[]
  workExperiences: WorkExperienceTypes[]
  // contacts: ContactTypes
}

type ResumeFormData = z.infer<typeof ResumeSchema>

export function CreateResumeForm({
  socialNetworks,
  workExperiences,
}: CreateResumeFormProps) {
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
      title: "Resume Title",
      slug: "resume_title",
      active: false,
      firstName: "Claudio",
      lastName: "Lins",
      email: "Lins@me.com",
      phone: "12312312312",
      about: "fasdfasfgasdgfsda fsdf sdf saf sd f sdf as",
      street: "123 Main St",
      city: "Anytown",
      state: "Anytown",
      country: "USA",
      zip: "12345",
    },
  })

  const title = watch("title")

  useEffect(() => {
    if (title) {
      const slug = title.toLowerCase().replace(/\s+/g, "-")
      setValue("slug", slug)
    }
  }, [title, setValue])

  console.log(errors)

  const handleDateChange = (date: Date) => {
    setValue("birthday", date)
  }

  async function createResumeForm(values: ResumeFormData) {
    startTransition(async () => {
      try {
        console.log("Submitting Resume form...", values)
        await createResume(values)
        setOutput(JSON.stringify(values, null, 2))
        // reset()
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  // function addEducation() {
  //   appendEducation({
  //     school: "",
  //     field: "",
  //     startDate: "",
  //     endDate: "",
  //   })
  // }

  // const endDate = workExperienceFields.map((_, index) =>
  //   watch(`workExperiences.${index}.endDate`)
  // )

  // useEffect(() => {
  //   if (endDate.some((date) => date)) {
  //     setStillWorking(true)
  //   } else {
  //     setStillWorking(false)
  //   }
  // }, [endDate])

  // function deleteWorkExperience(index: number) {
  //   removeWorkExperience(index)
  // }

  // function deleteEducation(index: number) {
  //   removeEducation(index)
  // }

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
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="Your email"
                  className="bg-white"
                />
                {errors?.email && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors?.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  {...register("phone")}
                  id="phone"
                  placeholder="Your phone"
                  className="bg-white"
                />
                {errors?.phone && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors?.phone.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="birthday">Birthday</Label>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => <DatePicker field={field} />}
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
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">Address</h3>
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

              <div className="flex items-center gap-2">
                <h3 className="font-bold">Social Network</h3>
                <CreateSocialNetworkForm />
                <div className="flex flex-wrap gap-4">
                  {socialNetworks?.length > 0 && (
                    <>
                      {socialNetworks.map((socialNetwork) => (
                        <div
                          className=" flex items-center gap-1 bg-white border rounded-md px-2 py-1 shadow-sm"
                          key={socialNetwork.id}
                        >
                          <Controller
                            name="socialNetworks"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="checkbox"
                                {...field}
                                value={socialNetwork.id}
                                checked={
                                  Array.isArray(field.value)
                                    ? field.value.some(
                                        (s) => s.id === socialNetwork.id
                                      )
                                    : false
                                }
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...(field.value || []), socialNetwork]
                                    : (field.value || []).filter(
                                        (s) => s.id !== socialNetwork.id
                                      )
                                  field.onChange(newValue)
                                }}
                              />
                            )}
                          />
                          <span className="text-sm">{socialNetwork.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              deleteSocialNetwork(socialNetwork.id)
                            }
                            className=""
                          >
                            <XCircle className="text-red-500" size={18} />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <Separator className="w-full mx-auto" />

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-xl">Work Experience</h3>
                  <CreateWorkExperienceForm />
                </div>
                <div className="flex flex-wrap gap-4">
                  {workExperiences?.length > 0 && (
                    <>
                      {workExperiences.map((workExperience) => {
                        return (
                          <div
                            key={workExperience.id}
                            className="w-full flex flex-col md:flex-row items-center justify-between gap-4"
                          >
                            <Controller
                              name="workExperiences"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="checkbox"
                                  {...field}
                                  value={workExperience.id}
                                  checked={
                                    Array.isArray(field.value)
                                      ? field.value.some(
                                          (s) => s.id === workExperience.id
                                        )
                                      : false
                                  }
                                  onChange={(e) => {
                                    const newValue = e.target.checked
                                      ? [...(field.value || []), workExperience]
                                      : (field.value || []).filter(
                                          (s) => s.id !== workExperience.id
                                        )
                                    field.onChange(newValue)
                                  }}
                                />
                              )}
                            />
                            <span className="text-sm">
                              {workExperience?.title}
                            </span>
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>
              <Separator className="w-full mx-auto" />

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl">Skills</h3>
                  <CreateSkillsForm />
                </div>

                {/* <div className="flex flex-wrap gap-4">
                  {skills.length > 0 && (
                    <>
                      {skills.map((skill) => (
                        <div
                          className=" flex items-center gap-1 bg-white border rounded-md px-2 py-1 shadow-sm"
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
                                checked={
                                  Array.isArray(field.value)
                                    ? field.value.some((s) => s.id === skill.id)
                                    : false
                                }
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...(field.value || []), skill]
                                    : (field.value || []).filter(
                                        (s) => s.id !== skill.id
                                      )
                                  field.onChange(newValue)
                                }}
                              />
                            )}
                          />
                          <span className="text-sm">{skill.name}</span>
                          <button
                            type="button"
                            onClick={() => deleteSkill(skill.id)}
                            className=""
                          >
                            <MinusCircle className="text-red-500" size={20} />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div> */}
              </div>
              <Separator className="w-full mx-auto" />

              {/* <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-xl">Education</h3>
                  <button
                    type="button"
                    onClick={addEducation}
                    className=" items-end"
                  >
                    <Plus size={24} />
                  </button>
                </div>
                {educationFields.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className="flex flex-col w-full space-y-4"
                    >
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="field">Field of Study</Label>
                        <Input
                          {...register(`education.${index}.field`)}
                          id="field"
                          placeholder="Title of your field of study"
                          className="bg-white"
                        />
                        {errors?.education?.[index]?.field && (
                          <span
                            className={cn(
                              "text-xs font-semibold text-red-600 -mt-2"
                            )}
                          >
                            {errors?.education?.[index]?.field.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="school">School</Label>
                        <Input
                          {...register(`education.${index}.school`)}
                          id="school"
                          placeholder="Name of your school"
                          className="bg-white"
                        />
                        {errors?.education?.[index]?.school && (
                          <span
                            className={cn(
                              "text-xs font-semibold text-red-600 -mt-2"
                            )}
                          >
                            {errors?.education?.[index]?.school.message}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 md:flex-row flex-col">
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            type="date"
                            {...register(`education.${index}.startDate`)}
                            id="startDate"
                            placeholder="The start date"
                            className="bg-white"
                          />
                          {errors?.education?.[index]?.startDate && (
                            <span
                              className={cn(
                                "text-xs font-semibold text-red-600 -mt-2"
                              )}
                            >
                              {errors?.education?.[index]?.startDate.message}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label htmlFor="startDate">End Date</Label>
                          <Input
                            type="date"
                            {...register(`education.${index}.endDate`)}
                            id="startDate"
                            placeholder="The start date"
                            className="bg-white"
                          />
                          {errors?.education?.[index]?.endDate && (
                            <span
                              className={cn(
                                "text-xs font-semibold text-red-600 -mt-2"
                              )}
                            >
                              {errors?.education?.[index]?.endDate.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="ml-auto"
                        onClick={() => deleteEducation(index)}
                      >
                        Delete Education
                      </Button>
                    </div>
                  )
                })}
              </div> */}
              <Separator className="w-full mx-auto" />

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl">References</h3>
                  <CreateReferenceForm />
                </div>

                {/* <div className="flex flex-wrap gap-6">
                  {references.length > 0 && (
                    <>
                      {references.map((reference) => (
                        <label
                          className=" flex items-center gap-1 bg-white border rounded-md p-4 relative shadow-sm w-full max-w-xs cursor-pointer"
                          key={reference.id}
                          title={reference.name}
                          htmlFor={reference.id}
                        >
                          <Controller
                            name="references"
                            control={control}
                            render={({ field }) => (
                              <input
                                id={reference.id}
                                type="checkbox"
                                {...field}
                                value={reference.id}
                                checked={
                                  Array.isArray(field.value)
                                    ? field.value.some(
                                        (s) => s.id === reference.id
                                      )
                                    : false
                                }
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...(field.value || []), reference]
                                    : (field.value || []).filter(
                                        (s) => s.id !== reference.id
                                      )
                                  field.onChange(newValue)
                                }}
                              />
                            )}
                          />
                          <div className="flex-1 flex-col flex border-l ml-2 pl-4">
                            <strong className="text-lg">
                              {reference.name}
                            </strong>
                            <small className="text-zinc-600">
                              {reference.role}
                            </small>
                            <small className="text-zinc-600">
                              {reference.email}
                            </small>
                            <small className="text-zinc-600">
                              {reference.phone.replace(
                                /(\d{3})(\d{3})(\d{3})(\d{3})/,
                                "$1 $2 $3 $4"
                              )}
                            </small>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteReference(reference.id)}
                            className=" absolute -top-2.5 -right-2.5 bg-white"
                          >
                            <XCircle className="text-red-500" size={20} />
                          </button>
                        </label>
                      ))}
                    </>
                  )}
                </div> */}
              </div>
              <Separator className="w-full mx-auto" />
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
