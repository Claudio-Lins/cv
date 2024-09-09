import { ResumeCard } from "@/components/resume-card"
import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

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

async function getResumes(userId: string) {
  const resumes = await prisma.resume.findMany({
    where: {
      userId,
    },
    include: {
      socialNetworks: true,
      educations: true,
      skills: true,
      workExperiences: true,
      references: true,
    },
  })
  return resumes
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
  const resumes = await getResumes(user?.id!)

  return (
    <div className="w-full p-20">
      <div className="flex flex-wrap justify-center gap-10">
        {resumes.map((resume) => (
          <ResumeCard
            slug={resume.slug}
            key={resume.id}
            title={resume.title}
            summary={resume?.about}
          />
        ))}
      </div>
    </div>
  )
}
