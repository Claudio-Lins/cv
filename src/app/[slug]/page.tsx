import { About } from "@/components/about"
import { Contacts } from "@/components/contacts"
import { Education } from "@/components/education"
import { Name } from "@/components/name"
import { NavResume } from "@/components/nav-resume"
import { Role } from "@/components/role"
import { Skills } from "@/components/skills"

import { WorkExperience } from "@/components/work-experiense"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

import { Footer } from "@/components/footer"
import { References } from "@/components/references"
import { getAllResume, getResumeBySlug } from "@/data/resume"

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
    <div className={cn("w-full max-w-7xl bg-white pb-20 print:mt-0")}>
      <NavResume slugs={slugs} />
      <div className="flex w-full max-w-7xl flex-col rounded-lg shadow-lg items-center px-16 print:mt-0 print:px-0 print:shadow-none">
        <Name
          picture={false}
          pictureUrl={resume?.pictureUrl || ""}
          firstName={resume?.firstName || ""}
          lastName={resume?.lastName || ""}
        />
        <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        <Role role={resume?.title || ""} />
        <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        <div className="grid sm:grid-cols-12 w-full my-8">
          <div className="sm:col-span-3 w-full flex flex-col space-y-10 print:border-r print:border-0.5">
            {resume?.street && (
              <>
                <Contacts
                  phone={resume?.phone || ""}
                  email={resume?.email || ""}
                  street={resume?.street || ""}
                  city={resume?.city || ""}
                  state={resume?.state || ""}
                  country={resume?.country || ""}
                  zip={resume?.zip || ""}
                  socialNetworks={resume?.socialNetworks || []}
                />
                <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10 print:hidden" />
              </>
            )}
            {resume?.educations.length > 0 && (
              <>
                <Education educations={resume?.educations || []} />
                <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
              </>
            )}
            {resume?.skills.length > 0 && (
              <>
                <Skills
                  skills={
                    resume?.skills?.map((skill) => ({
                      id: skill.id,
                      name: skill.name,
                      description: skill?.description || "",
                      type: skill.type,
                    })) || []
                  }
                />
                <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
              </>
            )}
          </div>
          <div className="w-px sm:col-span-1 min-h-full bg-gradient-to-b from-zinc-300/10 via-zinc-500 to-zinc-400/10 mx-10" />
          <div className="sm:col-span-8 w-full flex flex-col space-y-10 print:space-y-4 print:-ml-10">
            {resume?.about && (
              <>
                <About content={resume?.about || ""} />
                <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
              </>
            )}
            {resume?.workExperiences.length > 0 && (
              <>
                <WorkExperience workExperiences={resume?.workExperiences} />
                <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
              </>
            )}
            {resume?.references.length > 0 && (
              <>
                <References references={resume?.references} />
                <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
      {/* <pre>{JSON.stringify(resume, null, 2)}</pre> */}
    </div>
  )
}
