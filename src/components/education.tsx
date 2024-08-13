import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { calculateDuration } from "@/utils/caculate-duration-data"

dayjs.extend(duration)

interface EducationProps {
  educations: {
    id: string
    school: string
    field: string
    startDate: Date
    endDate: Date | null
  }[]
}

export function Education({ educations }: EducationProps) {
  return (
    <div
      className={cn("font-light text-zinc-600 tracking-widest  print:text-xs ")}
    >
      <h3 className=" uppercase font-light">Education</h3>
      <div className="flex flex-col mt-6 space-y-4">
        {educations?.map((edu) => (
          <div
            className="flex flex-col text-zinc-600 text-sm print:text-xs"
            key={edu.id}
          >
            <h4 className=" uppercase font-semibold">{edu?.field}</h4>
            <small>{edu?.school}</small>
            <div className="flex items-center justify-start gap-2">
              <small>
                {new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "short",
                }).format(edu.startDate)}
              </small>
              <span>|</span>
              <small>
                {edu.endDate
                  ? new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(edu.endDate)
                  : "N/A"}
              </small>
              <small className="text-gray-400 print:hidden">
                {calculateDuration(
                  edu.startDate.toString(),
                  edu?.endDate?.toString()
                )}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
