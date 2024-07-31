import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SkillsProps {}

export function Skills({}: SkillsProps) {
  return (
    <div className={cn("font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase font-light">Skills</h3>
      <div className="flex flex-col mt-6">
        <div className="flex flex-col text-zinc-600 text-sm">
          <h4 className=" uppercase font-semibold">Technical</h4>
          <div className="flex mt-4 flex-col gap-y-2">
            <span>JavaScript</span>
            <span>NextJs</span>
            <span>NodeJs</span>
            <span>Html</span>
            <span>TailwindCss</span>
            <span>Prisma</span>
            <span>ReactJs</span>
            <span>TypeScript</span>
            <span>React Hook Form</span>
            <span>Zustand</span>
            <span>React Native</span>
          </div>
        </div>
        <div className="flex flex-col text-zinc-600 text-sm mt-6">
          <h4 className=" uppercase font-semibold">Personal</h4>
          <div className="flex mt-4 flex-col gap-y-2">
            <span>Photography</span>
            <span>Cooking</span>
            <span>Travel</span>
            <span>Gaming</span>
            <span>Reading</span>
            <span>Writing</span>
          </div>
        </div>
      </div>
    </div>
  )
}
