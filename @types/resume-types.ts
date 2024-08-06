import { $Enums } from "@prisma/client"

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
  workExperiences: WorkExperience[]
  contact: Contact
}

export interface Contact {
  id: string
  email: string
  phone: string
  createdAt: Date
  addressId: string
  address: Address
  socialNetworks: SocialNetwork[]
}

export interface Address {
  id: string
  street: string
  city: string
  state: string
  county: null
  country: string
  zip: string
  createdAt: Date
}

export interface SocialNetwork {
  id: string
  name: string
  url: string
  createdAt: Date
  contactId: string
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

export interface WorkExperience {
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
