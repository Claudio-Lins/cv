import { cn } from "@/lib/utils"
import { calculateDuration } from "@/utils/caculate-duration-data"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import DOMPurify from "dompurify"
import { Globe } from "lucide-react"

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
  return (
    <div
      className={cn(
        "font-light text-zinc-600 tracking-widest  print:border-b print:pb-4"
      )}
    >
      <h3 className=" uppercase font-light myPrintingSubTitle">
        Work Experience
      </h3>
      {workExperiences?.map((workExperience) => (
        <div
          className="flex flex-col mt-6 space-y-4 w-full relative print:mt-0"
          key={workExperience.id}
        >
          <div className="absolute size-3 bg-zinc-400 rounded-full top-5 -left-[60px]" />
          <div className="flex flex-col text-zinc-600 text-sm print:text-xs">
            <h4 className=" uppercase font-semibold print:text-xs">
              {workExperience?.title}
            </h4>
            <small className="print:text-[10px]">
              {workExperience?.company} · {workExperience?.employmentType}
            </small>
            <div className="flex items-center justify-start gap-2">
              {workExperience?.isCurrent ? (
                <>
                  <small className="print:text-[10px]">
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(workExperience.startDate))}
                  </small>
                  <small className="text-gray-400 print:text-[10px]">|</small>
                  <small className="text-gray-400 text-xs print:text-[10px]">
                    {calculateDuration(
                      workExperience.startDate?.toISOString(),
                      workExperience.endDate?.toISOString()
                    )}
                  </small>
                  <small className="text-gray-400 print:text-[10px]">|</small>
                  <small className="text-gray-400 print:text-[10px]">
                    Current
                  </small>
                </>
              ) : (
                <>
                  <small className="print:text-[10px]">
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(workExperience.startDate))}
                  </small>
                  <small className="text-gray-400 print:text-[10px]">|</small>
                  <small className="print:text-[10px]">
                    {workExperience.endDate &&
                      new Intl.DateTimeFormat("pt-PT", {
                        year: "numeric",
                        month: "short",
                      }).format(new Date(workExperience.endDate))}
                  </small>
                  <small className="text-gray-400 print:text-[10px]">|</small>
                  <small className="text-gray-400 print:text-[10px]">
                    <small className="text-gray-400 text-xs print:text-[10px]">
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
          <div
            className="print:text-[10px] print:leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize
                ? DOMPurify.sanitize(workExperience?.description)
                : workExperience?.description,
            }}
          />
          {/* <p className="text-sm leading-relaxed text-balance whitespace-nowrap print:text-[10px] print:leading-relaxed">
            {workExperience?.description}
          </p> */}
          {workExperience?.link && (
            <div className="mt-4 flex items-center space-x-2">
              <Globe size={14} />
              <a
                href={workExperience?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <small className="print:text-[10px]">Visit Website</small>
                <small className="hidden print:flex print:text-[10px]">
                  {workExperience?.link}
                </small>
              </a>
            </div>
          )}
          <div className="w-3/4 mx-auto h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        </div>
      ))}
    </div>
  )
}
