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

async function getActiveResume(userId: string) {
  const resume = await prisma.resume.findFirst({
    where: {
      userId,
      active: true,
    },
  })
  return resume
}

export default async function Home() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const slugs = await getTitle(user?.id!)
  const activeResume = await getActiveResume(user?.id!)

  if (!slugs.length) {
    return redirect("/admin")
  }

  return (
    <div className="w-full flex items-center">
      <h1>{activeResume?.title}</h1>
    </div>
  )
}
