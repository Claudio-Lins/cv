import { $Enums } from "@prisma/client"

export interface ResumeTypes {
  id: string
  userId: string
  title: string
  slug: string
  active: boolean
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  birthday: Date | null
  pictureUrl: string | null
  about: string
  educations: EducationTypes[]
  skills: SkillTypes[] | null
  references: ReferenceTypes[]
  workExperiences: WorkExperienceTypes[]
  socialNetworks: SocialNetworkTypes[]
}

export interface AddressTypes {
  id: string
  title: string
  street: string
  city: string
  state: string
  country: string
  zip: string
  createdAt: Date
}

export interface SocialNetworkTypes {
  id: string
  name: string
  url: string
  createdAt: Date
}

export interface EducationTypes {
  id: string
  school: string
  field: string
  startDate: Date
  endDate: Date | null
}

export interface SkillTypes {
  id: string
  name: string
  type: string
  description: string | null
}

export interface ReferenceTypes {
  id: string
  name: string
  role: string | null
  email: string
  phone: string | null
}

export interface WorkExperienceTypes {
  id: string
  title: string
  description: string
  company: string
  location: string
  startDate: Date
  endDate: Date | null
  isCurrent: boolean
  link: string | null
  employmentType: "FREELANCER" | "VOLUNTEER" | "EMPLOYEE"
  workLocation: "REMOTE" | "ONSITE" | "HYBRID"
}
