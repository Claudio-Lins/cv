import { cn } from "@/lib/utils"
import { SkillType } from "@prisma/client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import DOMPurify from "dompurify"
import { Info } from "lucide-react"

interface SkillsProps {
  skills: {
    id: string
    name: string
    description?: string
    type: SkillType
  }[]
}

export function Skills({ skills }: SkillsProps) {
  const groupedSkills = skills.reduce<
    Record<
      SkillType,
      {
        id: string
        name: string
        description: string
      }[]
    >
  >(
    (groups, skill) => {
      const { type } = skill
      if (!groups[type]) {
        groups[type] = []
      }
      groups[type].push({
        id: skill.id,
        name: skill.name,
        description: skill.description || "",
      })
      return groups
    },
    {} as Record<
      SkillType,
      {
        id: string
        name: string
        description: string
      }[]
    >
  )

  return (
    <div className={cn("font-light text-zinc-600 tracking-widest")}>
      <h3 className="uppercase font-light myPrintingSubTitle">Skills</h3>
      <div className="flex flex-col mt-4">
        {Object.entries(groupedSkills).map(([type, skills]) => (
          <div key={type} className="flex flex-col text-zinc-600 text-sm mt-4 ">
            <h4 className="uppercase font-semibold mb-2 print:text-xs">
              {type}
            </h4>
            <div className="flex flex-col gap-y-2 print:gap-y-0">
              {skills.map((skill) => (
                <div className="flex items-center gap-1" key={skill.id}>
                  <span className="print:text-[8px]">{skill.name}</span>
                  {skill.description && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            strokeWidth={1}
                            className="text-zinc-600 size-4 cursor-context-menu print:hidden"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="w-[200px] p-4">
                          <div
                            className="print:text-[10px] print:leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize
                                ? DOMPurify.sanitize(skill.description)
                                : skill.description,
                            }}
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
