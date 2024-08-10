// import { $Enums } from "@prisma/client"

export interface ResumeTypes {
  id: string
  title: string
  slug: string
  active: boolean
  firstName: string
  lastName: string
  birthday: Date
  pictureUrl: string | null
  about: string
  createdAt: Date
  userId: string
  contactId: string | null
  education: Education[]
  skills: SkillTypes[] | null
  references: ReferenceTypes[] | null
  workExperiences: WorkExperienceTypes[]
  contact: ContactTypes[]
}

export interface ContactTypes {
  id: string
  createdAt: Date
  address: AddressTypes[]
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
  // contactId: string | null
}

export interface Education {
  id: string
  school: string
  field: string
  startYear: Date
  endYear: Date
}

export interface SkillTypes {
  id: string
  name: string
  type: string
}

export enum Type {
  Hobbies = "HOBBIES",
  Technical = "TECHNICAL",
}

export interface ReferenceTypes {
  id: string
  name: string
  role: string | null
  email: string
  phone: string
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
  link: null | string
  employmentType: string
  workLocation: string
  resumeId: string
}
