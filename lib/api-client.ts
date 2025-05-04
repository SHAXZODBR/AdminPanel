/**
 * API Client for connecting to all backend services
 */

// Mock service implementations for when API is unavailable
const youtubeVideoService = {
  getAll: async (language = "uz") => {
    console.log("Using mock YouTube video service")
    return { results: [], count: 0, next: null, previous: null }
  },
  getById: async (id: string) => {
    console.log("Using mock YouTube video service")
    return { id, title: "Mock Video", video_id: "dQw4w9WgXcQ", is_active: true }
  },
  create: async (data: any) => {
    console.log("Using mock YouTube video service - create", data)
    return { ...data, id: Date.now().toString() }
  },
  update: async (id: string, data: any) => {
    console.log("Using mock YouTube video service - update", id, data)
    return { ...data, id }
  },
  delete: async (id: string) => {
    console.log("Using mock YouTube video service - delete", id)
    return { success: true }
  },
}

const mapsService = {
  getAll: async (language = "uz") => {
    console.log("Using mock maps service")
    return { results: [], count: 0, next: null, previous: null }
  },
  getById: async (id: string) => {
    console.log("Using mock maps service")
    return { id, title: "Mock Map", imageUrl: "/placeholder.svg?height=300&width=500" }
  },
  create: async (data: any) => {
    console.log("Using mock maps service - create", data)
    return { ...data, id: Date.now().toString() }
  },
  update: async (id: string, data: any) => {
    console.log("Using mock maps service - update", id, data)
    return { ...data, id }
  },
  delete: async (id: string) => {
    console.log("Using mock maps service - delete", id)
    return { success: true }
  },
  uploadImage: async (file: File) => {
    console.log("Using mock maps service - uploadImage", file.name)
    return { url: "/placeholder.svg?height=300&width=500" }
  },
}

// Add this at the top of the file
const BASE_URL = "https://uzfk.uz"

// Update the BASE_URL to use the hardcoded value
const baseUrl = "https://uzfk.uz/api"

// Types for API responses and requests
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Base entity interface
export interface BaseEntity {
  id: number | string
  created_at?: string
  updated_at?: string
}

// Resource-specific interfaces
export interface User extends BaseEntity {
  username: string
  email: string
  full_name?: string
  role?: string
  avatar?: string
}

export interface Leadership extends BaseEntity {
  title: string
  description?: string
  position?: number
  full_name?: string
  phone_number?: string
  email?: string
  photo?: string
  language?: string
}

export interface LocalCouncil extends BaseEntity {
  name: string
  region?: string
  contact_info?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
  language?: string
}

export interface SocialNetwork extends BaseEntity {
  name: string
  url: string
  icon?: string
}

export interface Contact extends BaseEntity {
  name: string
  email: string
  phone?: string
  message: string
  status?: "new" | "read" | "responded"
}

export interface Content extends BaseEntity {
  title: string
  body: string
  slug?: string
  type?: string
}

export interface SectorAndDepartment extends BaseEntity {
  name: string
  type: "sector" | "department"
  parent_id?: number
  head?: string
  phone_number?: string
  email?: string
  language?: string
}

export interface Organization extends BaseEntity {
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
}

export interface YoutubeVideo extends BaseEntity {
  title: string
  video_id: string
  thumbnail?: string
  description?: string
  published_at?: string
}

export interface Tag extends BaseEntity {
  name: string
  alias: string
  language?: string
}

export interface Article extends BaseEntity {
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

// Replace any remaining environment variable references with hardcoded URL
// Base URL for API requests
// const BASE_URL = "https://uzfk.uz"

// Simplify the URL formatting function to be more robust
function formatApiUrl(baseUrl: string, endpoint: string, language: string): string {
  // Remove trailing slash from the endpoint if it exists
  const cleanEndpoint = endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint

  // Construct the URL with the language parameter
  return `${baseUrl}/${language}/api${cleanEndpoint}`
}

// Update the apiRequest function to use the formatApiUrl function
export async function apiRequest<T>(endpoint: string, method = "GET", data?: any, language = "uz"): Promise<T> {
  // Construct the full URL with language as path parameter
  const url = formatApiUrl(BASE_URL, endpoint, language)

  console.log(`Making API request to: ${url}`)

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  // Add auth token if available
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: "include", // Include cookies for session authentication
  }

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, options)
    console.log(`Response status: ${response.status}`)

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `API request failed with status ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.detail || errorData.message || errorMessage
      } catch (e) {
        // If we can't parse the error response, use the default message
      }

      throw new Error(errorMessage)
    }

    // For DELETE requests that return no content
    if (response.status === 204) {
      return {} as T
    }

    // Try to parse JSON response
    try {
      const responseData = await response.json()
      console.log(`Response data:`, responseData)
      return responseData
    } catch (e) {
      // If the response is not JSON, return an empty object
      return {} as T
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    throw error
  }
}

// Update the uploadFile function to use the correct URL structure
export async function uploadFile(
  endpoint: string,
  file: File,
  additionalData?: Record<string, any>,
  language = "uz",
): Promise<any> {
  const url = `${BASE_URL}/${language}/api${endpoint}`

  const formData = new FormData()
  formData.append("file", file)

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value))
    })
  }

  const headers: HeadersInit = {}

  // Add auth token if available
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `File upload failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error uploading file to ${url}:`, error)
    throw error
  }
}

// Update the API endpoints to use the proxy
export const api = {
  // Users API
  users: {
    getAll: (language = "uz") => apiRequest<PaginatedResponse<User>>(`/users`, "GET", undefined, language),
    getById: (id: string, language = "uz") => apiRequest<User>(`/users/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<User>(`/users`, "POST", data, language),
    update: (id: string, data: any, language = "uz") => apiRequest<User>(`/users/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<void>(`/users/${id}`, "DELETE", undefined, language),
  },

  // Leadership API
  leadership: {
    getAll: (language = "uz") => apiRequest<PaginatedResponse<Leadership>>(`/leadership`, "GET", undefined, language),
    getById: (id: string, language = "uz") => apiRequest<Leadership>(`/leadership/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<Leadership>(`/leadership`, "POST", data, language),
    update: (id: string, data: any, language = "uz") =>
      apiRequest<Leadership>(`/leadership/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<void>(`/leadership/${id}`, "DELETE", undefined, language),
  },

  // Social Networks API
  socialNetworks: {
    getAll: (language = "uz") =>
      apiRequest<PaginatedResponse<SocialNetwork>>(`/social-networks`, "GET", undefined, language),
    getById: (id: string, language = "uz") =>
      apiRequest<SocialNetwork>(`/social-networks/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<SocialNetwork>(`/social-networks`, "POST", data, language),
    update: (id: string, data: any, language = "uz") =>
      apiRequest<SocialNetwork>(`/social-networks/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<void>(`/social-networks/${id}`, "DELETE", undefined, language),
  },

  // Content API (News)
  content: {
    getAll: (language = "uz") => apiRequest<PaginatedResponse<Content>>(`/content`, "GET", undefined, language),
    getById: (id: string, language = "uz") => apiRequest<Content>(`/content/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<Content>(`/content`, "POST", data, language),
    update: (id: string, data: any, language = "uz") => apiRequest<Content>(`/content/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<void>(`/content/${id}`, "DELETE", undefined, language),
  },

  // Sector and Department API
  sectorAndDepartment: {
    getAll: (language = "uz") =>
      apiRequest<PaginatedResponse<SectorAndDepartment>>(`/sector-and-department`, "GET", undefined, language),
    getById: (id: string, language = "uz") =>
      apiRequest<SectorAndDepartment>(`/sector-and-department/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") =>
      apiRequest<SectorAndDepartment>(`/sector-and-department`, "POST", data, language),
    update: (id: string, data: any, language = "uz") =>
      apiRequest<SectorAndDepartment>(`/sector-and-department/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") =>
      apiRequest<void>(`/sector-and-department/${id}`, "DELETE", undefined, language),
  },

  // Contact API
  contact: {
    getAll: (language = "uz") => apiRequest<PaginatedResponse<Contact>>(`/contact`, "GET", undefined, language),
    getById: (id: string, language = "uz") => apiRequest<Contact>(`/contact/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<Contact>(`/contact`, "POST", data, language),
    update: (id: string, data: any, language = "uz") => apiRequest<Contact>(`/contact/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<void>(`/contact/${id}`, "DELETE", undefined, language),
  },

  // Organization API (Subordinate Organizations)
  organization: {
    getAll: (language = "uz") =>
      apiRequest<PaginatedResponse<Organization>>(`/organization`, "GET", undefined, language),
    getById: (id: string, language = "uz") =>
      apiRequest<Organization>(`/organization/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<Organization>(`/organization`, "POST", data, language),
    update: (id: string, data: any, language = "uz") =>
      apiRequest<Organization>(`/organization/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<void>(`/organization/${id}`, "DELETE", undefined, language),
  },

  // Local Council API (Regional Councils)
  localCouncil: {
    getAll: (language = "uz") =>
      apiRequest<PaginatedResponse<LocalCouncil>>(`/local-council`, "GET", undefined, language),
    getById: (id: string, language = "uz") =>
      apiRequest<LocalCouncil>(`/local-council/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<LocalCouncil>(`/local-council`, "POST", data, language),
    update: (id: string, data: any, language = "uz") =>
      apiRequest<LocalCouncil>(`/local-council/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<void>(`/local-council/${id}`, "DELETE", undefined, language),
  },

  // Admin API
  admin: {
    getAll: (language = "uz") => apiRequest<any[]>("/admin", "GET", undefined, language),
    getById: (id: string, language = "uz") => apiRequest<any>(`/admin/${id}`, "GET", undefined, language),
    create: (data: any, language = "uz") => apiRequest<any>("/admin", "POST", data, language),
    update: (id: string, data: any, language = "uz") => apiRequest<any>(`/admin/${id}`, "PUT", data, language),
    delete: (id: string, language = "uz") => apiRequest<any>(`/admin/${id}`, "DELETE", undefined, language),
    youtube: {
      getAll: (language = "uz") =>
        apiRequest<PaginatedResponse<YoutubeVideo>>("/admin/youtube", "GET", undefined, language),
      getById: (id: string, language = "uz") =>
        apiRequest<YoutubeVideo>(`/admin/youtube/${id}`, "GET", undefined, language),
      create: (data: any, language = "uz") => apiRequest<YoutubeVideo>("/admin/youtube", "POST", data, language),
      update: (id: string, data: any, language = "uz") =>
        apiRequest<YoutubeVideo>(`/admin/youtube/${id}`, "PUT", data, language),
      delete: (id: string, language = "uz") => apiRequest<void>(`/admin/youtube/${id}`, "DELETE", undefined, language),
    },
  },
  maps: mapsService,

  // Authentication
  auth: {
    login: (username: string, password: string, language = "uz") =>
      apiRequest<{ token: string; user: any }>("/auth/login", "POST", { username, password }, language),
    logout: (language = "uz") => apiRequest<{ success: boolean }>("/auth/logout", "POST", undefined, language),
  },

  // File uploads
  uploads: {
    uploadImage: (file: File, type = "image", language = "uz") => uploadFile("/upload", file, { type }, language),
    uploadDocument: (file: File, type = "document", language = "uz") => uploadFile("/upload", file, { type }, language),
  },
}

export default api
