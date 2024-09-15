import { prisma } from "@/lib/prisma"
import type { WorkExperienceTypes } from "../../@types/resume-types"

export async function getWorkExperiences(): Promise<WorkExperienceTypes[]> {
  const workExperiences = await prisma.workExperience.findMany()
  return workExperiences.map((experience) => ({
    ...experience,
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : null,
  }))
}
