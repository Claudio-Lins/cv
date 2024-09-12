import { prisma } from "@/lib/prisma"
import { useEffect, useState } from "react"
import type { EducationTypes } from "../../@types/resume-types"

const useEducations = () => {
  const [educations, setEducations] = useState<EducationTypes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEducations = async () => {
      setLoading(true)
      try {
        const data = await prisma.education.findMany()
        setEducations(data as EducationTypes[]) // Utiliza diretamente o tipo EducationTypes
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }

    fetchEducations()
  }, [])

  return { educations, loading, error }
}

export default useEducations
