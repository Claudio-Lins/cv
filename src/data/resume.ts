import { prisma } from "@/lib/prisma"

export async function getResumeBySlug(slug: string, userId: string) {
  const resume = await prisma.resume.findUnique({
    where: {
      userId,
      slug,
    },
    include: {
      education: true,
      skills: true,
      workExperiences: {
        orderBy: { endYear: "desc" },
      },

      contact: {
        include: {
          address: true,
          socialNetworks: true,
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
    select: {
      slug: true,
      title: true,
    },
  })
  return slugs
}
