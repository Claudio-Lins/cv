import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(duration)

interface EducationProps {
  education: {
    id: string
    school: string
    field: string
    startYear: Date
    endYear: Date
  }[]
}

export function Education({ education }: EducationProps) {
  return (
    <div className={cn("font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase font-light">Education</h3>
      <div className="flex flex-col mt-6 space-y-4">
        {education?.map((edu) => (
          <div className="flex flex-col text-zinc-600 text-sm" key={edu.id}>
            <h4 className=" uppercase font-semibold">{edu?.field}</h4>
            <small>{edu?.school}</small>
            <div className="flex items-center justify-start gap-2">
              <small>
                {new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "short",
                }).format(edu.startYear)}
              </small>
              <span>|</span>
              <small>
                {new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "short",
                }).format(edu.endYear)}
              </small>
              <small className="text-gray-400">
                {dayjs(edu.endYear).diff(dayjs(edu.startYear), "year") +
                  " years, " +
                  (dayjs(edu.endYear).diff(dayjs(edu.startYear), "month") %
                    12) +
                  " months, "}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
