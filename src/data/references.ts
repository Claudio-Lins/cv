import { prisma } from "@/lib/prisma"
import type { ReferenceTypes } from "../../@types/resume-types"

export async function getReferences(): Promise<ReferenceTypes[]> {
  return prisma.reference.findMany()
}
