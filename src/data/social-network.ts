import { prisma } from "@/lib/prisma"
import type { SocialNetworkTypes } from "../../@types/resume-types"

export async function getSocialNetworks(): Promise<SocialNetworkTypes[]> {
  return prisma.socialNetwork.findMany()
}
