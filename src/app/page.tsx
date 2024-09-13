import { ResumeCard } from "@/components/resume-card"
import { getResumeData, getResumes } from "@/services/resumeService"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Plus } from "lucide-react"

interface ResumeProps {
  params: {
    slug: string
  }
}

export default async function Resume({ params }: ResumeProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const { resumes, activeResume } = await getResumeData(user?.id!, params.slug)

  return (
    <div className="w-full p-20">
      <div className="flex flex-wrap justify-center gap-10">
        <div className="rounded-lg  w-96 h-64 overflow-hidden flex flex-col hover:scale-105 transition-all duration-500 hover:shadow-lg border-dashed border border-zinc-800 cursor-pointer group">
          {/* <div className="bg-gradient-to-r from-zinc-500 to-zinc-900 p-4 text-white">
            <h2 className="text-xl font-bold text-center line-clamp-1">
              New Resume
            </h2>
          </div> */}
          <div className="p-4 flex-grow flex items-center justify-center">
            <Plus
              size={100}
              className="text-zinc-400 group-hover:text-zinc-600 transition-all duration-500"
            />
          </div>
        </div>
        {resumes.map((resume) => (
          <ResumeCard
            resume={resume}
            slug={resume.slug}
            key={resume.id}
            title={resume.title}
            about={resume?.about}
          />
        ))}
      </div>
    </div>
  )
}
