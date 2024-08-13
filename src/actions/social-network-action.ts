"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { prisma } from "@/lib/prisma"
import { SocialNetworkSchema } from "@/zodSchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

export async function createSocialNetwork(
  values: z.infer<typeof SocialNetworkSchema>
) {
  const validateFields = SocialNetworkSchema.safeParse(values)
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

  await prisma.socialNetwork.create({
    data: {
      ...validateFields.data,
    },
  })

  return revalidatePath("/admin")
}

export async function deleteSocialNetwork(id: string) {
  await prisma.socialNetwork.delete({
    where: {
      id,
    },
  })

  return revalidatePath("/admin")
}
