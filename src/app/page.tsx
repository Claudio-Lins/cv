import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

async function getTitle() {
  const slugs = await prisma.resume.findMany({
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
  const slugs = await getTitle()

  return redirect(`/${slugs[0].slug}`)
}
