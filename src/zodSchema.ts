import * as z from "zod"

export const AddressSchema = z.object({
  id: z.string().cuid().optional(),
  street: z
    .string()
    .min(5, { message: "Street must be at least 5 characters" }),
  city: z.string().min(5, { message: "City must be at least 5 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  county: z.string().optional(),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" }),
  zip: z.string().min(2, { message: "Zip must be at least 2 characters" }),
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
  addressId: z.string().cuid().optional(),
  address: AddressSchema,
  socialNetworks: z.array(SocialNetworkSchema),
})

export const EducationSchema = z.object({
  id: z.string().cuid().optional(),
  school: z.string(),
  field: z.string(),
  startYear: z.string(),
  endYear: z.string(),
})

export const SkillSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  type: z.string(),
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
  startDate: z.string().date(),
  endDate: z.string().date().optional().nullable(),
  isCurrent: z.boolean(),
  link: z.string().url().nullable(),
  employmentType: z.enum(["FREELANCER", "VOLUNTEER", "EMPLOYEE"]),
  workLocation: z.enum(["REMOTE", "ONSITE", "HYBRID"]),
  resumeId: z.string().cuid().optional(),
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
  skills: z.array(SkillSchema),
  workExperiences: z.array(WorkExperienceSchema),
})
