import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SkillTypes } from "../../../@types/resume-types"

import { DeleteButton } from "../delete-button"
import { EditButton } from "../edit-button"
import { Controller, useFormContext } from "react-hook-form"
import { CreateSkillsForm } from "../forms/create-skills-form"
import { UpdateSkillsForm } from "../forms/update-skills-form"
import { Separator } from "../ui/separator"

interface SkillsManagerProps {
  skills: SkillTypes[]
  onDeleteSkill: (skillId: string) => void
}

export function SkillsManager({ skills, onDeleteSkill }: SkillsManagerProps) {
  const [currentSkill, setCurrentSkill] = useState<SkillTypes | null>(null)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const { control } = useFormContext()

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-xl">Skills</h3>
        <CreateSkillsForm />
      </div>

      <div className="flex flex-wrap gap-4">
        {skills.length > 0 && (
          <>
            {skills.map((skill) => (
              <div
                className="flex items-center gap-1 bg-white border rounded-md p-2 pl-3 shadow-sm"
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
                <div className="w-10 flex items-center flex-col gap-2 justify-center">
                  <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
                    <DialogTrigger asChild>
                      <EditButton
                        onClick={() => {
                          setCurrentSkill(skill)
                        }}
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-xs">
                      <DialogHeader>
                        <DialogTitle>Edit Skill</DialogTitle>
                      </DialogHeader>
                      {currentSkill && (
                        <UpdateSkillsForm
                          skill={currentSkill}
                          setIsOpenEdit={setIsOpenEdit}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
                    <DialogTrigger asChild>
                      <DeleteButton
                        onClick={() => {
                          setCurrentSkill(skill)
                        }}
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-xs">
                      <DialogHeader>
                        <DialogTitle>
                          Delete skill {currentSkill?.name}?
                        </DialogTitle>
                      </DialogHeader>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCurrentSkill(null)
                            setIsOpenDelete(false)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          color="error"
                          onClick={() => {
                            onDeleteSkill(currentSkill?.id!)
                            setCurrentSkill(null)
                            setIsOpenDelete(false)
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
