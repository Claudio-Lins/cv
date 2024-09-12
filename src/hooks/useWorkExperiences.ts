import { prisma } from "@/lib/prisma"
import { useEffect, useState } from "react"
import type { WorkExperienceTypes } from "../../@types/resume-types"

export function useWorkExperiences() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperienceTypes[]>(
    []
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchWorkExperiences() {
      setLoading(true)
      try {
        const data = await prisma.workExperience.findMany()
        setWorkExperiences(data as WorkExperienceTypes[]) // Cast seguro assumindo que os dados estão corretos
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }

    fetchWorkExperiences()
  }, [])

  return { workExperiences, loading, error }
}
