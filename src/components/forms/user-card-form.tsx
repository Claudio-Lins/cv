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
import { UserSchema } from "@/zodSchema"
import * as z from "zod"

interface UserTypes {
  resume: {
    id: string
    email: string
    firstName: string
    lastName: string
    profileImage: string
  }
}

export function UserCardForm({ resume }: UserTypes) {
  const { control, handleSubmit, formState, register } = useForm<
    z.infer<typeof UserSchema>
  >({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      id: "",
      email: resume.email,
      firstName: resume.firstName,
      lastName: resume.lastName,
      pictureUrl: resume.profileImage,
    },
  })
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Update User</CardTitle>
        <CardDescription>Update user information</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                {...register("firstName")}
                id="first-name"
                placeholder="First name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="last-name">Name</Label>
              <Input
                {...register("lastName")}
                id="last-name"
                placeholder="Last name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                placeholder="Email of your project"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  )
}
