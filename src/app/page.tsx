import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

async function getTitle(userId: string) {
  const slugs = await prisma.resume.findMany({
    where: {
      userId,
    },
    select: {
      slug: true,
      title: true,
    },
  })
  return slugs
}

export default async function Home() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const slugs = await getTitle(user?.id!)

  return redirect(`/${slugs[0].slug}`)
}
