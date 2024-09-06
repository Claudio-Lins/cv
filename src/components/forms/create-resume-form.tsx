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

import { deleteReference } from "@/actions/reference-action"
import { createResume } from "@/actions/resume-action"
import { deleteSkill } from "@/actions/skill-action"
import { deleteSocialNetwork } from "@/actions/social-network-action"
import { cn } from "@/lib/utils"
import { calculateDuration } from "@/utils/caculate-duration-data"
import { ResumeSchema } from "@/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Check,
  Loader,
  MinusCircle,
  MinusIcon,
  Plus,
  X,
  XCircle,
} from "lucide-react"
import { startTransition, useEffect, useState, useTransition } from "react"
import { Controller, FieldError, useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import {
  AddressTypes,
  EducationTypes,
  ReferenceTypes,
  ResumeTypes,
  SkillTypes,
  SocialNetworkTypes,
  WorkExperienceTypes,
} from "../../../@types/resume-types"
import { DeleteButton } from "../delete-button"
import { EditButton } from "../edit-button"
import { SkillsManager } from "../skills/skills-manager"
import { Separator } from "../ui/separator"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { CreateEducationForm } from "./create-eudcation-form"
import { CreateReferenceForm } from "./create-reference-form"
import { CreateSkillsForm } from "./create-skills-form"
import { CreateSocialNetworkForm } from "./create-social-form"
import { CreateWorkExperienceForm } from "./create-work-experience-form"
import { DatePicker } from "./date-picker"
import { MyInput } from "./my-input"
import { MyTextArea } from "./my-textArea"
import { UpdateSkillsForm } from "./update-skills-form"

interface CreateResumeFormProps {
  socialNetworks: SocialNetworkTypes[]
  skills: SkillTypes[]
  skill?: SkillTypes
  workExperiences: WorkExperienceTypes[]
  educations: EducationTypes[]
  references: ReferenceTypes[]
}

type ResumeFormData = z.infer<typeof ResumeSchema>

export function CreateResumeForm({
  socialNetworks,
  workExperiences,
  skills,
  skill,
  educations,
  references,
}: CreateResumeFormProps) {
  const [isPending, startTransition] = useTransition()
  const [output, setOutput] = useState("")
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof ResumeSchema>>({
    resolver: zodResolver(ResumeSchema),
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

  return (
    <>
      <form onSubmit={handleSubmit(createResumeForm)} className={cn("")}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create a Resume</CardTitle>
            <CardDescription className="">
              <span className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                accusantium quidem harum.
              </span>
            </CardDescription>
          </CardHeader>
          <Separator className="w-[97%] mx-auto" />
          <CardContent>
            <div className="grid w-full items-center gap-4 mt-4">
              <MyInput
                register={register}
                errors={errors as Record<string, FieldError>}
                registerValue="title"
                label="Title"
                placeholder="Resume Title"
              />
              <div className="flex w-full items-center gap-4 flex-col md:flex-row">
                <MyInput
                  register={register}
                  errors={errors as Record<string, FieldError>}
                  registerValue="firstName"
                  label="First Name"
                  placeholder="First Name"
                />
                <MyInput
                  register={register}
                  errors={errors as Record<string, FieldError>}
                  registerValue="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
              <MyInput
                register={register}
                errors={errors as Record<string, FieldError>}
                registerValue="email"
                label="Email"
                placeholder="Your email"
              />
              <MyInput
                register={register}
                errors={errors as Record<string, FieldError>}
                registerValue="phone"
                label="Phone"
                placeholder="Your phone"
                inputMode="tel"
                type="tel"
              />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="birthday">Birthday</Label>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <Input
                      type="date"
                      {...field}
                      id="birthday"
                      placeholder="The start date"
                      className="bg-white"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().substring(0, 10)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  )}
                />
                {errors.birthday && (
                  <span
                    className={cn("text-xs font-semibold text-red-600 -mt-2")}
                  >
                    {errors.birthday.message}
                  </span>
                )}
              </div>
              <MyTextArea
                register={register}
                errors={errors as Record<string, FieldError>}
                registerValue="about"
                label="About"
                placeholder="About"
              />
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">Address</h3>
              </div>
              <MyInput
                register={register}
                errors={errors as Record<string, FieldError>}
                registerValue="street"
                label="Street"
                placeholder="Street"
              />
              <div className="flex w-full items-center gap-4 flex-col md:flex-row">
                <MyInput
                  register={register}
                  errors={errors as Record<string, FieldError>}
                  registerValue="city"
                  label="City"
                  placeholder="City"
                />
                <MyInput
                  register={register}
                  errors={errors as Record<string, FieldError>}
                  registerValue="state"
                  label="State"
                  placeholder="State"
                />
              </div>
              <div className="flex w-full items-center gap-4 flex-col md:flex-row">
                <MyInput
                  register={register}
                  errors={errors as Record<string, FieldError>}
                  registerValue="country"
                  label="Country"
                  placeholder="Country"
                />
                <MyInput
                  register={register}
                  errors={errors as Record<string, FieldError>}
                  registerValue="zip"
                  label="Zip"
                  placeholder="Zip"
                />
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
                          <label
                            key={workExperience.id}
                            className="p-4 border rounded-md border-dashed shadow-sm flex items-center gap-3 cursor-pointer"
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
                            <div className="flex flex-col">
                              <strong className="text-base">
                                {workExperience?.title}
                              </strong>
                              <span className="text-sm">
                                {workExperience?.company}
                              </span>
                              <span className="text-sm capitalize">
                                {workExperience?.employmentType.toLowerCase()}
                              </span>
                              <span className="text-sm">
                                {new Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "short",
                                } as any).format(
                                  workExperience?.startDate
                                )}{" "}
                                -{" "}
                                {workExperience?.endDate &&
                                  new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  } as any).format(workExperience?.endDate)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {calculateDuration(
                                  workExperience?.startDate?.toISOString(),
                                  workExperience?.endDate?.toISOString()
                                )}
                              </span>
                            </div>
                          </label>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>
              <Separator className="w-full mx-auto" />

              <SkillsManager skills={skills} onDeleteSkill={deleteSkill} />
              <Separator className="w-full mx-auto" />

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-xl">Education</h3>
                  <CreateEducationForm />
                </div>
                <div className="flex flex-wrap gap-4">
                  {educations.length > 0 && (
                    <>
                      {educations.map((education) => {
                        return (
                          <label
                            key={education.id}
                            className="p-4 border rounded-md border-dashed shadow-sm flex items-center gap-3 cursor-pointer"
                          >
                            <Controller
                              name="educations"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="checkbox"
                                  {...field}
                                  value={education.id}
                                  checked={
                                    Array.isArray(field.value)
                                      ? field.value.some(
                                          (s) => s.id === education.id
                                        )
                                      : false
                                  }
                                  onChange={(e) => {
                                    const newValue = e.target.checked
                                      ? [...(field.value || []), education]
                                      : (field.value || []).filter(
                                          (s) => s.id !== education.id
                                        )
                                    field.onChange(newValue)
                                  }}
                                />
                              )}
                            />
                            <div className="flex flex-col">
                              <strong className="text-base">
                                {education?.field}
                              </strong>
                              <span className="text-sm">
                                {education?.school}
                              </span>
                              <span className="text-sm">
                                {new Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "short",
                                } as any).format(education?.startDate)}{" "}
                                -{" "}
                                {education?.endDate &&
                                  new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  } as any).format(education?.endDate)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {calculateDuration(
                                  education?.startDate?.toISOString(),
                                  education?.endDate?.toISOString()
                                )}
                              </span>
                            </div>
                          </label>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>
              <Separator className="w-full mx-auto" />

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl">References</h3>
                  <CreateReferenceForm />
                </div>

                <div className="flex flex-wrap gap-6">
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
                              {reference?.phone &&
                                reference?.phone.replace(
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
                </div>
              </div>
              <Separator className="w-full mx-auto" />
            </div>
          </CardContent>
          <Separator className="w-[97%] mx-auto" />
          <CardFooter className="flex mt-6 justify-between">
            <Button type="submit" className="flex items-center gap-1">
              <Loader
                className={cn("hidden", isPending && "block animate-spin")}
              />
              <span>Create Resume</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
      {/* <pre>{output}</pre> */}
    </>
  )
}
