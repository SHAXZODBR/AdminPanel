export type User = {
  id: string
  login: string
  createdAt: string
}

export type Leader = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  fullName: string
  position: string
  phoneNumber: string
  email: string
  bio: string
  photo?: string
  createdAt: string
}

export type Tag = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  alias: string
  createdAt: string
}

export type Category = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  parent: string
  position: number
  createdAt: string
}

export type Article = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  title: string
  category: string
  image: string
  author: string
  views: number
  createdAt: string
  content?: string
}

export type Department = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  type: "department" | "sector"
  head: string
  phoneNumber: string
  email: string
  createdAt: string
}

// Add new types
export type SubordinateOrganization = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  type: "organization" | "institution"
  head: string
  phoneNumber: string
  email: string
  address: string
  createdAt: string
}

export type RegionalCouncil = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  region: string
  head: string
  phoneNumber: string
  email: string
  address: string
  createdAt: string
}

export type Leadership = {
  id: number | string
  title: string
  description?: string
  position?: number
  full_name?: string
  phone_number?: string
  email?: string
  photo?: string
  language?: string
  created_at?: string
  updated_at?: string
}

export type SectorAndDepartment = {
  id: number | string
  name: string
  type: "sector" | "department"
  parent_id?: number
  head?: string
  phone_number?: string
  email?: string
  language?: string
  created_at?: string
  updated_at?: string
}

export type Organization = {
  id: number | string
  name: string
  description?: string
  logo?: string
  website?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
  type?: string
  language?: string
  created_at?: string
  updated_at?: string
}

export type LocalCouncil = {
  id: number | string
  name: string
  region?: string
  contact_info?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
  language?: string
  created_at?: string
  updated_at?: string
}
