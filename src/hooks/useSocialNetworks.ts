import { prisma } from "@/lib/prisma"
import { useEffect, useState } from "react"
import type { SocialNetworkTypes } from "../../@types/resume-types"

export function useSocialNetworks() {
  const [socialNetworks, setSocialNetworks] = useState<SocialNetworkTypes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSocialNetworks() {
      setLoading(true)
      try {
        const data = await prisma.socialNetwork.findMany()
        setSocialNetworks(data as SocialNetworkTypes[]) // Cast seguro assumindo que os dados estão corretos
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }

    fetchSocialNetworks()
  }, [])

  return { socialNetworks, loading, error }
}
