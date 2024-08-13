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
import { useForm, Controller } from "react-hook-form"
import { ResumeSchema } from "@/zodSchema"
import * as z from "zod"
import { Switch } from "../ui/switch"
import { Separator } from "../ui/separator"
import { ResumeTypes } from "../../../@types/resume-types"
// import { updateResume } from "@/actions/resume-action"
import { revalidatePath } from "next/cache"
import { startTransition, useEffect, useState } from "react"

interface ResumeEditCardProps {
  resume: ResumeTypes
}

type ResumeFormData = z.infer<typeof ResumeSchema>

export function ResumeEditCard({ resume }: ResumeEditCardProps) {
  const [errors, setErrors] = useState("")
  const [outPut, setOutPut] = useState("")
  const { control, handleSubmit, formState, register, reset } = useForm<
    z.infer<typeof ResumeSchema>
  >({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      id: resume.id,
      title: resume.title,
      slug: resume?.title.toLowerCase().replace(/ /g, "-"),
      // active: resume.active,
      firstName: resume.firstName,
      lastName: resume.lastName,
      // birthday: resume.birthday?.toISOString().slice(0, 10),
      // pictureUrl: resume.pictureUrl || "",
      // about: resume.about,
    },
  })

  const onSubmit = async (values: ResumeFormData) => {
    console.log(errors ? formState.errors : "No errors")
    startTransition(async () => {
      try {
        console.log("Submitting Product form...", values)
        // await updateResume(values)
        setOutPut(JSON.stringify(values, null, 2))
        reset()
      } catch (error) {
        console.error("Error creating product:", error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Card className="w-full md:px-4">
        <CardHeader>
          <CardTitle>{resume.title}!!!!</CardTitle>
          <CardDescription className="flex items-center space-x-2">
            {/* <span className="font-bold text-lg">
              {resume?.active ? "Active" : "Inactive"}
            </span>
            <Switch {...register("active")} defaultChecked={resume.active} /> */}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="grid w-full items-center gap-4 mt-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register("title")}
                id="title"
                placeholder="Title of your resume"
              />
            </div>
            <div className="w-full flex flex-col md:flex-row items-center md:space-x-4 space-y-1.5">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  {...register("firstName")}
                  id="firstName"
                  placeholder="First name"
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  {...register("lastName")}
                  id="lastName"
                  placeholder="Last name"
                />
              </div>
            </div>
            {/* <div className="flex w-full items-center">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  type="date"
                  {...register("birthday")}
                  id="birthday"
                  placeholder="Last name"
                />
              </div>
            </div> */}
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                placeholder="Email of your project"
              />
            </div> */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" className="text-blue-500">
            Edit
          </Button>
        </CardFooter>
      </Card>
      <pre>{outPut}</pre>
    </form>
  )
}
