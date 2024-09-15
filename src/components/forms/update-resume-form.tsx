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
import { Loader, PencilIcon, Trash2, XCircle } from "lucide-react"
import { useState, useTransition } from "react"
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
import { UpdateSkillsForm } from "./update-skills-form"
import { UpdateWorkExperienceForm } from "./update-work-experience-form"

interface UpdateResumeFormProps {
  resume: ResumeTypes
  socialNetworks: SocialNetworkTypes[]
  skills: SkillTypes[]
  workExperiences: WorkExperienceTypes[]
  educations: EducationTypes[]
  references: ReferenceTypes[]
}
type ResumeFormData = z.infer<typeof ResumeSchema>

export function UpdateResumeForm({
  resume,
  socialNetworks,
  skills,
  workExperiences,
  educations,
  references,
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
      title: resume.title,
      slug: resume?.title.toLowerCase().replace(/ /g, "-"),
      active: resume.active,
      firstName: resume.firstName,
      lastName: resume.lastName,
      email: resume.email,
      phone: resume.phone,
      street: resume.street,
      city: resume.city,
      state: resume.state,
      country: resume.country,
      zip: resume.zip,
      about: resume.about,
      socialNetworks: resume?.socialNetworks,
      workExperiences:
        resume?.workExperiences?.map((exp) => ({
          ...exp,
          link: exp.link ?? undefined,
        })) || [],
      educations: resume?.educations || [],
      references:
        resume?.references?.map((ref) => ({
          ...ref,
          role: ref.role ?? undefined,
          phone: ref.phone ?? undefined,
        })) || [],
      skills:
        resume?.skills?.map((skill) => ({
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
    },
  })

  console.log(errors || "No errors")
  async function updateResumeForm(values: ResumeFormData) {
    startTransition(async () => {
      try {
        console.log("Submitting Resume form...", values)
        console.log("SLUG: ", values.slug)
        await updateResume(resume.id, values)
      } catch (error) {
        console.error("Error updating resume:", error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(updateResumeForm)} className={cn("")}>
      <Card className="max-w-none">
        <CardHeader>
          <CardTitle>Edit a Resume</CardTitle>
          <CardDescription className="flex items-center space-x-2"></CardDescription>
        </CardHeader>
        <Separator className="w-[95%] mx-auto" />
        <CardContent>
          <div className="grid w-full items-center gap-4 mt-4">
            <MyInput
              register={register}
              errors={errors as Record<string, FieldError>}
              registerValue="title"
              label="Title"
              placeholder="Resume Title"
              defaultValue={resume.title}
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
            <Label>About</Label>
            <Controller
              name="about"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RichTextEditor
                  height="100%"
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
                          className=" flex items-center gap-1 bg-white border rounded-md p-2 pl-3 shadow-sm"
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
                          <div className="flex-1 flex flex-col border-l border-r ml-2 px-4">
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
                          <div className="w-10 flex items-center flex-col gap-2 justify-center">
                            <Dialog
                              open={isOpenEditWorkExperience}
                              onOpenChange={setIsOpenEditWorkExperience}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setCurrentWorkExperience(workExperience)
                                  }}
                                >
                                  <PencilIcon size={20} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-none sm:max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    Edit Work Experience
                                  </DialogTitle>
                                </DialogHeader>
                                {currentWorkExperience && (
                                  <UpdateWorkExperienceForm
                                    workExperience={currentWorkExperience}
                                    setIsOpenEditWorkExperience={
                                      setIsOpenEditWorkExperience
                                    }
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                            <Dialog
                              open={isOpenDeleteWorkExperience}
                              onOpenChange={setIsOpenDeleteWorkExperience}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setCurrentWorkExperience(workExperience)
                                  }}
                                >
                                  <Trash2 size={20} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-xs">
                                <DialogHeader>
                                  <DialogTitle>
                                    Delete Work Experience{" "}
                                    {currentWorkExperience?.title}?
                                  </DialogTitle>
                                </DialogHeader>
                                <DialogFooter className="w-full">
                                  <div className="flex items-center w-full justify-between">
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setCurrentWorkExperience(workExperience)
                                        setIsOpenDeleteWorkExperience(false)
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      color="error"
                                      onClick={() => {
                                        deleteWorkExperience(
                                          currentWorkExperience?.id!
                                        )
                                        setCurrentWorkExperience(null)
                                        setIsOpenDeleteWorkExperience(false)
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
                      <div
                        className=" flex items-center gap-1 bg-white border rounded-md p-2 pl-3 shadow-sm"
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
                        <div className="flex-1 flex flex-col border-l border-r ml-2 px-4">
                          <span className="text-base font-bold">
                            {skill.name}
                          </span>
                          <span className="text-xs capitalize">
                            {skill.type}
                          </span>
                        </div>
                        <div className="w-10 flex items-center flex-col gap-2 justify-center">
                          <Dialog
                            open={isOpenEdit}
                            onOpenChange={setIsOpenEdit}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setCurrentSkill(skill)
                                }}
                              >
                                <PencilIcon size={20} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xs">
                              <DialogHeader>
                                <DialogTitle>Edit Skill</DialogTitle>
                              </DialogHeader>
                              {currentSkill && (
                                <UpdateSkillsForm
                                  skill={currentSkill}
                                  setIsOpenEdit={setIsOpenEdit}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Dialog
                            open={isOpenDeleteSkill}
                            onOpenChange={setisOpenDeleteSkill}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setCurrentSkill(skill)
                                }}
                              >
                                <Trash2 size={20} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xs">
                              <DialogHeader>
                                <DialogTitle>Delete Skill</DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                Are you sure you want to delete this skill?
                              </DialogDescription>
                              <DialogFooter className="w-full">
                                <div className="flex items-center w-full justify-between">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setCurrentSkill(null)
                                      setisOpenDeleteSkill(false)
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    color="error"
                                    onClick={() => {
                                      deleteSkill(currentSkill?.id!)
                                      setCurrentSkill(null)
                                      setisOpenDeleteSkill(false)
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
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
                          <strong className="text-lg">{reference.name}</strong>
                          <small className="text-zinc-600">
                            {reference.role}
                          </small>
                          <small className="text-zinc-600">
                            {reference.email}
                          </small>
                          <small className="text-zinc-600">
                            {reference.phone &&
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
            <span>Update Resume</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
