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

import { getAllResume, getResumeBySlug } from "@/data/resume"
import { Footer } from "@/components/footer"

interface ResumeProps {
  params: {
    slug: string
  }
}

export default async function Resume({ params }: ResumeProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const resume = await getResumeBySlug(params.slug, user?.id!)
  const slugs = await getAllResume(user?.id!)

  if (!resume?.id) {
    return redirect("/admin")
  }
  return (
    <div className={cn("w-full max-w-7xl pb-20")}>
      <NavResume slugs={slugs} />
      <div className="flex  w-full max-w-7xl flex-col bg-white rounded-lg shadow-lg items-center px-16 print:mt-0 print:px-0">
        <Name
          picture={false}
          pictureUrl={resume?.pictureUrl || ""}
          firstName={resume?.firstName || ""}
          lastName={resume?.lastName || ""}
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
              socialNetworks={resume?.contact?.socialNetworks || []}
            />
            <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
            <Education education={resume?.education || []} />
            <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
            <Skills
              skills={
                resume?.skills?.map((skill) => ({
                  id: skill.id,
                  name: skill.name,
                  type: skill.type,
                })) || []
              }
            />
          </div>
          <div className="w-px sm:col-span-1 min-h-full bg-gradient-to-b from-zinc-300/10 via-zinc-500 to-zinc-400/10 mx-10" />
          <div className="sm:col-span-8 w-full flex flex-col space-y-10">
            <About content={resume?.about || ""} />
            <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
            <WorkExperience workExperiences={resume?.workExperiences} />
          </div>
        </div>
        <Footer />
      </div>
      {/* <pre>{JSON.stringify(resume, null, 2)}</pre> */}
    </div>
  )
}
