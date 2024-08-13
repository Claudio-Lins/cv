import * as z from "zod"

export const SocialNetworkSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().url(),
})

const phoneRegex = /^\+?[1-9]\d{1,14}$/

const phoneSchema = z
  .string()
  .min(10, { message: "Phone number must be at least 10 digits long" })
  .max(15, { message: "Phone number must be no more than 15 digits long" })
  .refine((val) => phoneRegex.test(val), {
    message: "Invalid phone number format",
  })

export const AddressSchema = z.object({
  title: z.string().min(1, "Title is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "Zip is required"),
})

export const EducationSchema = z.object({
  id: z.string().cuid().optional(),
  school: z
    .string()
    .min(3, { message: "School must be at least 3 characters" }),
  field: z.string().min(3, { message: "Field must be at least 3 characters" }),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
})

export const SkillSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  type: z.enum(["TECHNICAL", "PERSONAL", "SOFTSKILL", "HOBBIES", "HARDSKILL"]),
})

export const WorkExperienceSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  company: z
    .string()
    .min(3, { message: "Company must be at least 3 characters" }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters" }),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  isCurrent: z.boolean().optional(),
  link: z.string().url().optional(),
  employmentType: z.enum(["FREELANCER", "VOLUNTEER", "EMPLOYEE"]),
  workLocation: z.enum(["REMOTE", "ONSITE", "HYBRID"]),
  resumeId: z.string().cuid().optional(),
})

export const ReferenceSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email(),
  role: z.string().optional(),
  phone: phoneSchema,
})

export const ResumeSchema = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().cuid().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  slug: z.string(),
  active: z.boolean().optional(),
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" }),
  email: z.string().email(),
  phone: phoneSchema,
  birthday: z.date().optional(),
  pictureUrl: z.string().url().optional(),
  about: z
    .string()
    .min(20, { message: "About must be at least 20 characters" }),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "Zip is required"),
  socialNetworks: z.array(SocialNetworkSchema),
  workExperiences: z.array(WorkExperienceSchema),
  skills: z.array(SkillSchema),
  educations: z.array(EducationSchema),
  references: z.array(ReferenceSchema),
})
