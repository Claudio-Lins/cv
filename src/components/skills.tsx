import { cn } from "@/lib/utils"
import { SkillType } from "@prisma/client"

interface SkillsProps {
  skills: {
    id: string
    name: string
    type: SkillType
  }[]
}

export function Skills({ skills }: SkillsProps) {
  const groupedSkills = skills.reduce<
    Record<SkillType, { id: string; name: string }[]>
  >((groups, skill) => {
    const { type } = skill
    if (!groups[type]) {
      groups[type] = []
    }
    groups[type].push({ id: skill.id, name: skill.name })
    return groups
  }, {} as Record<SkillType, { id: string; name: string }[]>)

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
                <span key={skill.id} className="print:text-[8px]">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
