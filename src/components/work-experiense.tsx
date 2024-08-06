import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { calculateDuration } from "@/utils/caculate-duration-data"

dayjs.extend(duration)

interface WorkExperienceProps {
  workExperiences: {
    id: string
    title: string
    description: string
    company: string
    location: string
    startDate: Date
    endDate: Date | null
    employmentType: string
    workLocation: string
    link: string | null
    isCurrent?: boolean
  }[]
}

export function WorkExperience({ workExperiences }: WorkExperienceProps) {
  // function calculateDuration(startDate: string, endDate?: string): string {
  //   const start = dayjs(startDate)
  //   const end = endDate ? dayjs(endDate) : dayjs()

  //   const diffYears = end.diff(start, "year")
  //   start.add(diffYears, "year")

  //   const diffMonths = end.diff(start, "month")

  //   return `${diffYears} years, ${diffMonths} months`
  // }

  return (
    <div className={cn(" pl-10 font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase">Work Experience</h3>
      {workExperiences?.map((workExperience) => (
        <div
          className="flex flex-col mt-6 space-y-4 w-full relative"
          key={workExperience.id}
        >
          <div className=" absolute size-3 bg-zinc-400 rounded-full top-5 -left-[101px]" />
          <div className="flex flex-col text-zinc-600 text-sm">
            <h4 className=" uppercase font-semibold">
              {workExperience?.title}
            </h4>
            <small>
              {workExperience?.company} · {workExperience?.employmentType}
            </small>
            <div className="flex items-center justify-start gap-2">
              {workExperience?.isCurrent ? (
                <>
                  <small>
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(workExperience.startDate))}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small className="text-gray-400 text-xs">
                    {calculateDuration(
                      workExperience.startDate?.toISOString(),
                      workExperience.endDate?.toISOString()
                    )}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small className="text-gray-400">Current</small>
                </>
              ) : (
                <>
                  <small>
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(workExperience.startDate))}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small>
                    {workExperience.endDate &&
                      new Intl.DateTimeFormat("pt-PT", {
                        year: "numeric",
                        month: "short",
                      }).format(new Date(workExperience.endDate))}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small className="text-gray-400">
                    <small className="text-gray-400 text-xs">
                      {calculateDuration(
                        workExperience.startDate?.toISOString(),
                        workExperience.endDate?.toISOString()
                      )}
                    </small>
                  </small>
                </>
              )}
            </div>
            <small>
              {workExperience?.location} · {workExperience?.workLocation}
            </small>
          </div>

          <p className="text-sm leading-relaxed text-balance whitespace-nowrap print:leading-snug">
            {workExperience?.description}
          </p>
          {workExperience?.link && (
            <div className="mt-4 flex items-center space-x-2">
              <Globe size={14} />
              <a
                href={workExperience?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <small className="">Visit Website</small>
              </a>
            </div>
          )}
          <div className="w-3/4 mx-auto h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        </div>
      ))}
    </div>
  )
}
