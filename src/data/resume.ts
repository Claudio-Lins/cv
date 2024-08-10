import { prisma } from "@/lib/prisma"

export async function getResumeBySlug(slug: string, userId: string) {
  const resume = await prisma.resume.findUnique({
    where: {
      userId,
      slug,
    },
    // include: {
    //   education: true,
    //   skills: true,
    //   workExperiences: {
    //     orderBy: { endDate: "desc" },
    //   },

    //   contact: {
    //     include: {
    //       addresses: true,
    //       socialNetworks: true,
    //     },
    //   },
    // },
  })
  return resume
}

export async function getAllResume(userId: string) {
  const slugs = await prisma.resume.findMany({
    where: {
      userId,
    },
    // include: {
    //   education: true,
    //   skills: true,
    //   workExperiences: true,
    //   references: true,
    //   contact: {
    //     include: {
    //       addresses: true,
    //       socialNetworks: true,
    //     },
    //   },
    // },
  })
  return slugs
}
