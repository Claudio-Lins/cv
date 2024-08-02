import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(duration)

interface WorkExperienceProps {
  workExperiences: {
    id: string
    title: string
    description: string
    company: string
    location: string
    startYear: Date
    endYear: Date | null
    employmentType: string
    workLocation: string
    link: string | null
    isCurrent?: boolean
  }[]
}

export function WorkExperience({ workExperiences }: WorkExperienceProps) {
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
              {workExperience?.endYear && (
                <>
                  <small>
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(workExperience.startYear))}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small>
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(workExperience.endYear))}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small className="text-gray-400">
                    {dayjs(workExperience.endYear).year() !==
                      dayjs(workExperience.startYear).year() ||
                    dayjs(workExperience.endYear).month() !==
                      dayjs(workExperience.startYear).month()
                      ? dayjs(workExperience.endYear).diff(
                          dayjs(workExperience.startYear),
                          "year"
                        ) +
                        " years, " +
                        (dayjs(workExperience.endYear).diff(
                          dayjs(workExperience.startYear),
                          "month"
                        ) %
                          12) +
                        " months"
                      : (dayjs(workExperience.endYear).diff(
                          dayjs(workExperience.startYear),
                          "month"
                        ) %
                          12) +
                        " months"}
                  </small>
                </>
              )}
              {!workExperience.endYear && (
                <>
                  <small>
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(workExperience.startYear))}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small className="text-gray-400">
                    {dayjs().year() !== dayjs(workExperience.startYear).year()
                      ? dayjs().diff(dayjs(workExperience.startYear), "year") +
                        " years, "
                      : null}
                    {(dayjs().diff(dayjs(workExperience.startYear), "month") %
                      12) +
                      " months"}
                  </small>
                  <small className="text-gray-400">|</small>
                  <small className="text-gray-400">Current</small>
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
