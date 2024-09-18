'use client'

import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { WorkExperienceTypes } from '../../../@types/resume-types'
import { UpdateWorkExperienceForm } from '../forms/update-work-experience-form'

interface WorkExperienceProps {
	workExperience: WorkExperienceTypes
}

export function WorkExperience({ workExperience }: WorkExperienceProps) {
	return (
		<div className={cn('w-full max-w-sm')}>
			<Card className=' w-full overflow-hidden'>
				<CardHeader className='bg-zinc-900 text-center flex items-center justify-center h-24'>
					<CardTitle className='text-white text-ellipsis overflow-hidden'>{workExperience.title}</CardTitle>
				</CardHeader>
				<CardContent className=' mt-4'>
					<UpdateWorkExperienceForm workExperience={workExperience} />
				</CardContent>
			</Card>
		</div>
	)
}
