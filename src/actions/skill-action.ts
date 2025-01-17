"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { prisma } from "@/lib/prisma"
import { SkillSchema } from "@/zodSchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

export async function createSkill(values: z.infer<typeof SkillSchema>) {
  const validateFields = SkillSchema.safeParse(values)
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

  await prisma.skill.create({
    data: {
      ...validateFields.data,
    },
  })

  return revalidatePath("/admin")
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({
    where: {
      id,
    },
  })

  return revalidatePath("/admin")
}

export async function updateSkill(
  id: string,
  values: z.infer<typeof SkillSchema>,
  slug?: string
) {
  const validateFields = SkillSchema.safeParse(values)
  if (!validateFields.success) {
    throw new Error("Invalid category data")
  }

  await prisma.skill.update({
    where: {
      id,
    },
    data: {
      ...validateFields.data,
    },
  })

  return revalidatePath("/admin")
}
