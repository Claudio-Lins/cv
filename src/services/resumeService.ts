import { prisma } from "@/lib/prisma"

// Função existente - manteremos as funções existentes para compatibilidade e referência.
export async function getResumes(userId: string) {
  const resumes = await prisma.resume.findMany({
    where: {
      userId,
    },
    include: {
      socialNetworks: true,
      educations: true,
      skills: true,
      workExperiences: true,
      references: true,
    },
  })
  return resumes
}

export async function getActiveResume(userId: string) {
  const resume = await prisma.resume.findFirst({
    where: {
      userId,
      active: true,
    },
  })
  return resume
}

export async function getResumeData(userId: string, slug?: string) {
  const resumes = await getResumes(userId)
  const activeResume = slug
    ? resumes.find((resume) => resume.slug === slug)
    : null

  return { resumes, activeResume }
}
