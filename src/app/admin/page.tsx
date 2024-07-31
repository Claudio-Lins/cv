import { NavResume } from "@/components/nav-resume"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

interface AdminProps {}

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

export default async function Admin({}: AdminProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const slugs = await getTitle(user?.id!)
  return (
    <div className={cn("")}>
      <NavResume slugs={slugs} />
      <pre>{JSON.stringify(slugs, null, 2)}</pre>
    </div>
  )
}
