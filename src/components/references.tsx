import { cn } from '@/lib/utils'
import { calculateDuration } from '@/utils/caculate-duration-data'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Globe } from 'lucide-react'
import { ReferenceTypes } from '../../@types/resume-types'

dayjs.extend(duration)

interface ReferencesProps {
	references: ReferenceTypes[]
}

export function References({ references }: ReferencesProps) {
	return (
		<div className={cn('font-light text-zinc-600 tracking-widest ')}>
			<h3 className=' uppercase font-light myPrintingSubTitle'>References</h3>
			<div className=' flex flex-col gap-4'>
				{references?.map((reference) => {
					return (
						<div
							key={reference.id}
							className='flex flex-col space-y-1 w-full max-w-[300px] mt-6 relative print:max-w-[250px]'
						>
							<h3 className='font-bold uppercase print:text-[10px]'>{reference?.name}</h3>
							<p className='font-semibold text-xs print:text-[10px]'>{reference?.role}</p>
							<p className='text-xs print:text-[10px]'>{reference?.phone}</p>
							<p className='text-xs print:text-[10px]'>{reference?.email}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}
