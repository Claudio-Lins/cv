"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { prisma } from "@/lib/prisma"
import { WorkExperienceSchema } from "@/zodSchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

export async function createWorkExperience(
  values: z.infer<typeof WorkExperienceSchema>
) {
  const validateFields = WorkExperienceSchema.safeParse(values)
  if (!validateFields.success) {
    throw new Error("Invalid category data")
  }
  console.log(validateFields)

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  })

  if (!user) {
    return redirect("/")
  }

  console.log(validateFields)

  await prisma.workExperience.create({
    data: {
      ...validateFields.data,
    },
  })

  return revalidatePath("/admin")
}

export async function deleteWorkExperience(id: string) {
  await prisma.workExperience.delete({
    where: {
      id,
    },
  })

  return revalidatePath("/admin")
}
