import { cn } from "@/lib/utils"
import { Home, Mail, Phone } from "lucide-react"

interface EducationProps {}

export function Education({}: EducationProps) {
  return (
    <div className={cn("font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase font-light">Education</h3>
      <div className="flex flex-col mt-6 space-y-4">
        <div className="flex flex-col text-zinc-600 text-sm">
          <h4 className=" uppercase font-semibold">photography</h4>
          <small>Centro Universitário FMU | FIAM-FAAM</small>
          <small>2015 | 2017</small>
        </div>
      </div>
    </div>
  )
}
