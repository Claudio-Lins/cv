import { ResumeCard } from '@/components/resume-card'
import { getEducation } from '@/data/educations'
import { getReferences } from '@/data/references'
import { getSkills } from '@/data/skills'
import { getSocialNetworks } from '@/data/social-network'
import { getWorkExperiences } from '@/data/work-experiences'
import { getResumeData, getResumes } from '@/services/resumeService'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface ResumeProps {
	params: {
		slug: string
	}
}

export default async function Resume({ params }: ResumeProps) {
	const { getUser } = getKindeServerSession()
	const user = await getUser()
	const { resumes } = await getResumeData(user?.id!, params.slug)
	const allSocialNetworks = await getSocialNetworks()
	const allWorkExperiences = await getWorkExperiences()
	const allSkills = await getSkills()
	const allEducations = await getEducation()
	const allReferences = await getReferences()

	return (
		<div className='w-full p-20'>
			<div className='flex flex-wrap justify-center gap-10'>
				<Link
					href='/admin/create/'
					className='rounded-lg  w-96 h-64 overflow-hidden flex flex-col hover:scale-105 transition-all duration-500 hover:shadow-lg border-dashed border border-zinc-800 cursor-pointer group'
				>
					<div className='p-4 flex-grow flex items-center justify-center'>
						<Plus
							size={100}
							className='text-zinc-400 group-hover:text-zinc-600 transition-all duration-500 group-hover:rotate-180'
						/>
					</div>
				</Link>
				{resumes.map((resume) => (
					<ResumeCard
						id={resume.id}
						resume={resume}
						slug={resume.slug}
						key={resume.id}
						title={resume.title}
						about={resume?.about}
						allSocialNetworks={allSocialNetworks}
						allWorkExperiences={allWorkExperiences}
						allSkills={allSkills}
						allEducations={allEducations}
						allReferences={allReferences}
					/>
				))}
			</div>
		</div>
	)
}
