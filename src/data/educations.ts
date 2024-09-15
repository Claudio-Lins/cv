import { prisma } from "@/lib/prisma"
import type { EducationTypes } from "../../@types/resume-types"

export async function getEducation(): Promise<EducationTypes[]> {
  return prisma.education.findMany()
}
