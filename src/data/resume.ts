import { prisma } from "@/lib/prisma"

export async function getResumeBySlug(slug: string, userId: string) {
  const resume = await prisma.resume.findUnique({
    where: {
      userId,
      slug,
    },

    include: {
      socialNetworks: true,
      educations: true,
      skills: true,
      workExperiences: {
        orderBy: {
          startDate: "desc",
        },
      },
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
      educations: true,

      workExperiences: true,
    },
  })
  return slugs
}
