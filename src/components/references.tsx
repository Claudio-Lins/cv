import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { calculateDuration } from "@/utils/caculate-duration-data"
import { ReferenceTypes } from "../../@types/resume-types"

dayjs.extend(duration)

interface ReferencesProps {
  references: ReferenceTypes[]
}

export function References({ references }: ReferencesProps) {
  return (
    <div className={cn("font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase print:text-xs">References</h3>
      <div className=" flex flex-wrap gap-4">
        {references?.map((reference) => {
          return (
            <div
              key={reference.id}
              className="flex flex-col space-y-1 w-full max-w-[200px] mt-6 relative p-4 border border-dashed border-zinc-300"
            >
              <h3 className="font-bold uppercase print:text-xs">
                {reference?.name}
              </h3>
              <p className="font-semibold text-xs print:text-xs">
                {reference?.role}
              </p>
              <p className="text-xs print:text-xs">{reference?.phone}</p>
              <p className="text-xs print:text-xs">{reference?.email}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
