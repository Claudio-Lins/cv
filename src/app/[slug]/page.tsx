import { About } from "@/components/about.tsx"
import { Contacts } from "@/components/contacts"
import { Education } from "@/components/education"
import { Name } from "@/components/name"
import { NavResume } from "@/components/nav-resume"
import { Role } from "@/components/role"
import { Skills } from "@/components/skills"

import { WorkExperience } from "@/components/work-experiense"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

interface ResumeProps {
  params: {
    slug: string
  }
}

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
async function getResume(slug: string, userId: string) {
  const resume = await prisma.resume.findUnique({
    where: {
      userId,
      slug,
    },
    include: {
      education: true,
      about: true,
      skills: true,
      user: true,
      contact: {
        include: {
          address: true,
          socials: true,
        },
      },
    },
  })
  return resume
}

export default async function Resume({ params }: ResumeProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const resume = await getResume(params.slug, user?.id!)
  const slugs = await getTitle(user?.id!)

  if (!resume?.id) {
    return redirect("/admin")
  }
  return (
    <div className={cn("w-full max-w-7xl")}>
      <NavResume slugs={slugs} />
      <div className="flex  w-full max-w-7xl flex-col bg-white rounded-lg shadow-lg items-center px-16 print:mt-0 print:px-0">
        <Name
          picture={false}
          pictureUrl={resume?.user?.profileImage || ""}
          firstName={resume?.user?.firstName || ""}
          lastName={resume?.user?.lastName || ""}
        />
        <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        <Role role={resume?.title || ""} />
        <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        <div className="grid sm:grid-cols-12 w-full my-14">
          <div className="sm:col-span-3 w-full flex flex-col space-y-10">
            <Contacts
              phone={resume?.contact?.phone || ""}
              email={resume?.contact?.email || ""}
              address={resume?.contact?.address || {}}
              socials={resume?.contact?.socials || []}
            />
            <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
            <Education education={resume?.education || []} />
            <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
            <Skills />
          </div>
          <div className="w-px sm:col-span-1 min-h-full bg-gradient-to-b from-zinc-300/10 via-zinc-500 to-zinc-400/10 mx-10" />
          <div className="sm:col-span-8 w-full flex flex-col space-y-10">
            <About content={resume?.about?.content || ""} />
            <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
            <WorkExperience />
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(resume, null, 2)}</pre> */}
    </div>
  )
}
