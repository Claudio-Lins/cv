import { ResumeCard } from "@/components/resume-card"
import { getResumeData, getResumes } from "@/services/resumeService"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

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
