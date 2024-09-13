"use client"
import { deleteReference } from "@/actions/reference-action"
import { updateResume } from "@/actions/resume-action"
import { deleteSkill } from "@/actions/skill-action"
import { deleteWorkExperience } from "@/actions/work-experience-action"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { calculateDuration } from "@/utils/caculate-duration-data"
import { ResumeSchema } from "@/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { Controller, FieldError, useForm } from "react-hook-form"
import * as z from "zod"
import {
  EducationTypes,
  ReferenceTypes,
  ResumeTypes,
  SkillTypes,
  SocialNetworkTypes,
  WorkExperienceTypes,
} from "../../../@types/resume-types"
import { RichTextEditor } from "../rich-texte-ditor"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { CreateEducationForm } from "./create-eudcation-form"
import { CreateReferenceForm } from "./create-reference-form"
import { CreateSkillsForm } from "./create-skills-form"
import { CreateSocialNetworkForm } from "./create-social-form"
import { CreateWorkExperienceForm } from "./create-work-experience-form"
import { MyInput } from "./my-input"

interface UpdateResumeFormProps {
  title: string
  slug: string
  firstName: string
  lastName: string
  email: string
  phone: string
  birthday?: Date
  about: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  socialNetworks: SocialNetworkTypes[]
  workExperiences: WorkExperienceTypes[]
  skills: SkillTypes[]
  educations: EducationTypes[]
  references: ReferenceTypes[]
  resume: ResumeTypes
}
type ResumeFormData = z.infer<typeof ResumeSchema>

export function UpdateResumeForm2({
  title,
  firstName,
  lastName,
  email,
  phone,
  birthday,
  about,
  street,
  city,
  state,
  country,
  zip,
  socialNetworks,
  workExperiences,
  skills,
  educations,
  references,
  resume,
}: UpdateResumeFormProps) {
  const [isPending, startTransition] = useTransition()
  const [isOpenDeleteSkill, setisOpenDeleteSkill] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<SkillTypes | null>(null)
  const [currentWorkExperience, setCurrentWorkExperience] =
    useState<WorkExperienceTypes | null>(null)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteWorkExperience, setIsOpenDeleteWorkExperience] =
    useState(false)
  const [isOpenEditWorkExperience, setIsOpenEditWorkExperience] =
    useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<ResumeFormData>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      title: title,
      slug: title.toLowerCase().replace(/ /g, "-"),
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      birthday: birthday ?? undefined, // Use nullish coalescing to assign undefined if birthday is null
      about: about,
      street: street,
      city: city,
      state: state,
      country: country,
      zip: zip,
      socialNetworks: socialNetworks,
      workExperiences:
        workExperiences?.map((exp) => ({
          ...exp,
          link: exp.link ?? undefined,
        })) || [],
      references:
        references?.map((ref) => ({
          ...ref,
          role: ref.role ?? undefined,
          phone: ref.phone ?? undefined,
        })) || [],
      skills:
        skills?.map((skill) => ({
          type: skill.type as
            | "TECHNICAL"
            | "PERSONAL"
            | "SOFTSKILL"
            | "HOBBIES"
            | "HARDSKILL"
            | undefined,
          name: skill.name,
          id: skill.id,
        })) || [],
      educations: educations || [],
    },
  })

  console.log(errors || "No errors")
  async function updateResumeForm(values: ResumeFormData) {
    startTransition(async () => {
      try {
        console.log("Submitting Resume form...", values)
        await updateResume(resume.id, values)
      } catch (error) {
        console.error("Error updating resume:", error)
      }
    })
  }

  useEffect(() => {
    const element = document.getElementById("editor")
    console.log(element)
  }, [])

  return (
    <form onSubmit={handleSubmit(updateResumeForm)} className={cn("w-full")}>
      <div className="grid w-full items-center gap-4 mt-4">
        <MyInput
          register={register}
          errors={errors as Record<string, FieldError>}
          registerValue="title"
          label="Title"
          placeholder="Resume Title"
          defaultValue={title}
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
        <div className="flex w-full items-center gap-4 flex-col md:flex-row">
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
        </div>
        <div className="flex flex-col space-y-1.5 md:w-1/4">
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
            <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
              {errors.birthday.message}
            </span>
          )}
        </div>
        <Label>About</Label>
        <Controller
          name="about"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RichTextEditor
              height="280px"
              value={field.value || ""}
              onChange={(value) => field.onChange(value)}
              registerValue="about"
              errors={errors as Record<string, FieldError>}
            />
          )}
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
                      className=" flex items-center gap-1 bg-white border rounded-md p-2 pl-3 shadow-sm cursor-pointer"
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
                      <div className="flex-1 flex flex-col border-l ml-2 px-4">
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
                          } as any).format(workExperience?.startDate)}{" "}
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

        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xl">Skills</h3>
            <CreateSkillsForm />
          </div>
          <div className="flex flex-wrap gap-4">
            {skills.length > 0 && (
              <>
                {skills.map((skill) => (
                  <Label
                    className=" flex items-center gap-1 bg-white border rounded-md p-2 pl-3 shadow-sm cursor-pointer"
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
                    <div className="flex-1 flex flex-col border-l ml-2 px-4">
                      <span className="text-base font-bold">{skill.name}</span>
                      <span className="text-xs capitalize">{skill.type}</span>
                    </div>
                  </Label>
                ))}
              </>
            )}
          </div>
        </div>

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
                                ? field.value.some((s) => s.id === education.id)
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
                        <span className="text-sm">{education?.school}</span>
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
                  <Label
                    className=" flex items-center gap-1 bg-white border rounded-md p-2 pl-3 shadow-sm cursor-pointer max-w-xs"
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
                              ? field.value.some((s) => s.id === reference.id)
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
                    <div className="flex-1 flex-col gap-y-1 flex border-l ml-2 pl-4">
                      <strong className="text-lg">{reference.name}</strong>
                      <span className="text-zinc-600 leading-relaxed">
                        {reference.role}
                      </span>
                      <span className="text-zinc-600">{reference.email}</span>
                      <span className="text-zinc-600">
                        {reference.phone &&
                          reference?.phone.replace(
                            /(\d{3})(\d{3})(\d{3})(\d{3})/,
                            "$1 $2 $3 $4"
                          )}
                      </span>
                    </div>
                  </Label>
                ))}
              </>
            )}
          </div>
        </div>
        <Separator className="w-full mx-auto" />
      </div>

      <Separator className="w-[97%] mx-auto" />
      <div className="flex mt-6 justify-between">
        <Button type="submit" className="flex items-center gap-1">
          <Loader className={cn("hidden", isPending && "block animate-spin")} />
          <span>Update Resume</span>
        </Button>
      </div>
    </form>
  )
}
