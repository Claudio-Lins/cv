import { Controller, useFormContext } from "react-hook-form"
import { SkillTypes } from "../../../@types/resume-types"

interface SkillsListProps {
  skills: SkillTypes[]
}

export function SkillsList({ skills }: SkillsListProps) {
  const { control } = useFormContext()

  return (
    <div className="flex flex-wrap gap-4">
      {skills.length > 0 && (
        <>
          {skills.map((skill) => (
            <div
              className=" flex items-center gap-1 bg-white border rounded-md p-2 pl-3 shadow-sm"
              key={skill.id}
              title={skill.type}
            >
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    value={skill.id}
                    checked={
                      Array.isArray(field.value)
                        ? field.value.some((s) => s.id === skill.id)
                        : false
                    }
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(field.value || []), skill]
                        : (field.value || []).filter(
                            (s: any) => s.id !== skill.id
                          )
                      field.onChange(newValue)
                    }}
                  />
                )}
              />
              <div className="flex-1 flex flex-col border-l border-r ml-2 px-4">
                <span className="text-base font-bold">{skill.name}</span>
                <span className="text-xs capitalize">{skill.type}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
