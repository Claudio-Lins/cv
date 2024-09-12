import { prisma } from "@/lib/prisma"
import { useEffect, useState } from "react"
import type { SkillTypes } from "../../@types/resume-types"

export function useSkills() {
  const [skills, setSkills] = useState<SkillTypes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true)
      try {
        const data = await prisma.skill.findMany()
        setSkills(data as SkillTypes[])
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return { skills, loading, error }
}
