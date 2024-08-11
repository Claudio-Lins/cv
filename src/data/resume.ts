import { prisma } from "@/lib/prisma"

export async function getResumeBySlug(slug: string, userId: string) {
  const resume = await prisma.resume.findUnique({
    where: {
      userId,
      slug,
    },

    include: {
      socialNetworks: true,
      workExperiences: true,
    },
  })
  return resume
}

export async function getAllResume(userId: string) {
  const slugs = await prisma.resume.findMany({
    where: {
      userId,
    },

    include: {
      socialNetworks: true,
      workExperiences: true,
    },
  })
  return slugs
}
