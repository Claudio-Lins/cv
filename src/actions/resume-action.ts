"use server"

import { prisma } from "@/lib/prisma"
import { ResumeSchema } from "@/zodSchema"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

export async function createResume(values: z.infer<typeof ResumeSchema>) {
  const validateFields = ResumeSchema.safeParse(values)
  if (!validateFields.success) {
    throw new Error("Invalid category data")
  }
  console.log(validateFields)

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect("/")
  }

  console.log(validateFields)

  await prisma.resume.create({
    data: {
      ...validateFields.data,
      userId: user.id,
      slug: validateFields.data.title.toLowerCase().replace(/\s+/g, "-"),
      active: true,
      birthday: validateFields.data.birthday
        ? validateFields.data.birthday.toISOString()
        : null,
      pictureUrl: "/default-picture.jpg",
      socialNetworks: {
        connect: values.socialNetworks.map((socialNetwork) => ({
          id: socialNetwork.id,
        })),
      },
      workExperiences: {
        connect: values.workExperiences.map((workExperience) => ({
          id: workExperience.id,
        })),
      },
      skills: {
        connect: values.skills.map((skill) => ({
          id: skill.id,
        })),
      },
      educations: {
        connect: values.educations.map((education) => ({
          id: education.id,
        })),
      },
      references: {
        connect: values.references.map((reference) => ({
          id: reference.id,
        })),
      },
    },
  })

  return redirect(`/${values.slug}`)
}

export async function updateResume(
  id: string,
  values: z.infer<typeof ResumeSchema>
) {
  const validateFields = ResumeSchema.safeParse(values)
  if (!validateFields.success) {
    throw new Error("Invalid category data")
  }

  await prisma.resume.update({
    where: {
      id,
    },
    data: {
      ...validateFields.data,
      slug: validateFields.data.title.toLowerCase().replace(/\s+/g, "-"),
      birthday: validateFields.data.birthday
        ? validateFields.data.birthday.toISOString()
        : null,
      socialNetworks: {
        set: values.socialNetworks.map((socialNetwork) => ({
          id: socialNetwork.id,
        })),
      },
      workExperiences: {
        set: values.workExperiences.map((workExperience) => ({
          id: workExperience.id,
        })),
      },
      skills: {
        set: values.skills.map((skill) => ({
          id: skill.id,
        })),
      },
      educations: {
        set: values.educations.map((education) => ({
          id: education.id,
        })),
      },
      references: {
        set: values.references.map((reference) => ({
          id: reference.id,
        })),
      },
    },
  })

  return redirect(
    `/${validateFields.data.title.toLowerCase().replace(/\s+/g, "-")}`
  )
  // return revalidatePath(`/${values.slug}`)
}

export async function deleteResume(slug: string) {
  await prisma.resume.delete({
    where: {
      slug,
    },
  })

  return redirect("/")
}
