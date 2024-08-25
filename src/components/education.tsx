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
      className={cn(
        "font-light text-zinc-600 tracking-widest print:tracking-wider"
      )}
    >
      <h3 className=" uppercase font-light myPrintingSubTitle">Education</h3>
      <div className="flex flex-col mt-6 space-y-4 print:space-y-0">
        {educations?.map((edu) => (
          <div className="flex flex-col space-y-1 print:space-y-0" key={edu.id}>
            <h4 className=" uppercase  text-zinc-600 text-sm font-semibold print:text-xs">
              {edu?.field}
            </h4>
            <small className="print:text-[8px] text-xs">{edu?.school}</small>
            <div className="flex items-center justify-start gap-2">
              <small className="print:text-[8px] text-xs">
                {new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "short",
                }).format(edu.startDate)}
              </small>
              <span className="print:text-[8px] text-xs">|</span>
              <small className="print:text-[8px] text-xs">
                {edu.endDate
                  ? new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                    }).format(edu.endDate)
                  : "N/A"}
              </small>
              <small className="text-gray-400 print:hidden text-xs">
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
