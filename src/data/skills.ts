import { prisma } from "@/lib/prisma"
import type { SkillTypes } from "../../@types/resume-types"

export async function getSkills(): Promise<SkillTypes[]> {
  return prisma.skill.findMany()
}
