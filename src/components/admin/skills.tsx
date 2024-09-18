'use client'

import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SkillTypes } from '../../../@types/resume-types'
import { UpdateSkillsForm } from '../forms/update-skills-form'

interface SkillsProps {
	skill: SkillTypes
}

export function Skills({ skill }: SkillsProps) {
	return (
		<div className={cn('w-full max-w-sm')}>
			<Card className=' w-full overflow-hidden'>
				<CardHeader className='bg-zinc-900 text-center flex items-center justify-center h-24'>
					<CardTitle className='text-white text-ellipsis overflow-hidden'>{skill.name}</CardTitle>
				</CardHeader>
				<CardContent className=' mt-4'>
					<UpdateSkillsForm skill={skill} />
				</CardContent>
			</Card>
		</div>
	)
}
