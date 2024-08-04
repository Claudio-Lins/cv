import * as z from "zod"

export const AddressSchema = z.object({
  id: z.string().cuid().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string().optional(),
  country: z.string(),
  zip: z.string(),
})

export const SocialNetworkSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().url(),
  contactId: z.string().cuid().optional(),
})

const phoneRegex = /^\+?[1-9]\d{1,14}$/

const phoneSchema = z
  .string()
  .min(10, { message: "Phone number must be at least 10 digits long" })
  .max(15, { message: "Phone number must be no more than 15 digits long" })
  .refine((val) => phoneRegex.test(val), {
    message: "Invalid phone number format",
  })

export const ContactSchema = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email(),
  phone: phoneSchema,
  // addressId: z.string().cuid(),
  address: AddressSchema,
  socialNetworks: z.array(SocialNetworkSchema),
})

export const EducationSchema = z.object({
  id: z.string().cuid(),
  school: z.string(),
  field: z.string(),
  startYear: z.string().datetime(),
  endYear: z.string().datetime(),
})

export const SkillSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  type: z.enum(["TECHNICAL", "PERSONAL", "SOFTSKILL", "HOBBIES", "HARDSKILL"]),
})

export const WorkExperienceSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  company: z.string(),
  location: z.string(),
  startYear: z.string().datetime(),
  endYear: z.string().datetime().nullable(),
  isCurrent: z.boolean(),
  link: z.string().url().nullable(),
  employmentType: z.enum(["FREELANCER", "VOLUNTEER", "EMPLOYEE"]),
  workLocation: z.enum(["REMOTE", "ONSITE", "HYBRID"]),
  resumeId: z.string().cuid(),
})

export const ResumeSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  slug: z.string(),
  active: z.boolean(),
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" }),
  birthday: z.string(),
  pictureUrl: z.string().url().optional(),
  about: z
    .string()
    .min(10, { message: "About must be at least 10 characters" }),
  // userId: z.string().cuid(),
  // contactId: z.string().cuid(),
  contact: ContactSchema,
  // education: z.array(EducationSchema),
  // skills: z.array(SkillSchema),
  // workExperiences: z.array(WorkExperienceSchema),
})
