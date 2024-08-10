"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { prisma } from "@/lib/prisma"
import { ReferenceSchema } from "@/zodSchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

export async function createReference(values: z.infer<typeof ReferenceSchema>) {
  const validateFields = ReferenceSchema.safeParse(values)
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

  await prisma.reference.create({
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

export async function deleteReference(id: string) {
  await prisma.reference.delete({
    where: {
      id,
    },
  })

  return revalidatePath("/admin")
}
