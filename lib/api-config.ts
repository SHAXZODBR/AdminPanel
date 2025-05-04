/**
 * API Configuration
 *
 * This file contains all API configuration settings and request formats.
 * Modify these settings to match your backend API requirements.
 */

// Base API URL - ensure this is correct
export const API_BASE_URL = "https://uzfk.uz"

// Default language mapping
// If your API doesn't accept certain language codes, map them here
export const LANGUAGE_MAPPING: Record<string, string> = {
  // If the frontend uses "ru" but the API needs "uz" for Russian content
  ru: "uz",
  en: "en",
  uz: "uz",
  "uz-cyrl": "uz-cyrl",
}

// Request format configurations for different endpoints
export const REQUEST_FORMATS = {
  // Content/Articles endpoint
  content: {
    create: {
      mapRequestData: (data: any) => ({
        title: data.title,
        body: data.content || data.body,
        type: data.category || data.type || "article",
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        title: data.title,
        body: data.content || data.body,
        type: data.category || data.type || "article",
      }),
    },
  },

  // Leadership endpoint
  leadership: {
    create: {
      mapRequestData: (data: any) => ({
        name: data.fullName || data.name,
        position: data.position,
        phone: data.phoneNumber || data.phone,
        email: data.email,
        description: data.bio || data.description,
        image: data.photo || data.image,
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        name: data.fullName || data.name,
        position: data.position,
        phone: data.phoneNumber || data.phone,
        email: data.email,
        description: data.bio || data.description,
        image: data.photo || data.image,
      }),
    },
  },

  // Organization endpoint
  organization: {
    create: {
      mapRequestData: (data: any) => ({
        name: data.name,
        head: data.head,
        phone_number: data.phoneNumber,
        email: data.email,
        address: data.address,
        type: data.type || "organization",
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        name: data.name,
        head: data.head,
        phone_number: data.phoneNumber,
        email: data.email,
        address: data.address,
        type: data.type || "organization",
      }),
    },
  },

  // Local Council endpoint
  localCouncil: {
    create: {
      mapRequestData: (data: any) => ({
        name: data.name,
        region: data.region,
        head: data.head,
        phone_number: data.phoneNumber,
        email: data.email,
        address: data.address,
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        name: data.name,
        region: data.region,
        head: data.head,
        phone_number: data.phoneNumber,
        email: data.email,
        address: data.address,
      }),
    },
  },

  // Sector and Department endpoint
  sectorAndDepartment: {
    create: {
      mapRequestData: (data: any) => ({
        name: data.name,
        type: data.type || "department",
        head: data.head,
        phone_number: data.phoneNumber,
        email: data.email,
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        name: data.name,
        type: data.type || "department",
        head: data.head,
        phone_number: data.phoneNumber,
        email: data.email,
      }),
    },
  },

  // YouTube videos endpoint
  youtube: {
    create: {
      mapRequestData: (data: any) => ({
        title: data.title,
        video_id: data.videoId || data.video_id,
        is_active: data.isActive !== undefined ? data.isActive : true,
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        title: data.title,
        video_id: data.videoId || data.video_id,
        is_active: data.isActive !== undefined ? data.isActive : true,
      }),
    },
  },

  // Social networks endpoint
  socialNetworks: {
    create: {
      mapRequestData: (data: any) => ({
        name: data.platform || data.name,
        url: data.url,
        is_active: data.isActive !== undefined ? data.isActive : true,
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        name: data.platform || data.name,
        url: data.url,
        is_active: data.isActive !== undefined ? data.isActive : true,
      }),
    },
  },

  // Contact endpoint
  contact: {
    create: {
      mapRequestData: (data: any) => ({
        type: data.type,
        value: data.value,
        description: data.description,
      }),
    },
    update: {
      mapRequestData: (data: any) => ({
        type: data.type,
        value: data.value,
        description: data.description,
      }),
    },
  },
}

// API endpoint paths
export const API_ENDPOINTS = {
  USERS: "users",
  LEADERSHIP: "leadership",
  CONTENT: "content",
  SECTOR_AND_DEPARTMENT: "sector-and-department",
  ORGANIZATION: "organization",
  LOCAL_COUNCIL: "local-council",
  SOCIAL_NETWORKS: "social-networks",
  CONTACT: "contact",
  YOUTUBE: "admin/youtube",
}

// Helper function to format API URLs
export function formatApiUrl(endpoint: string, language: string, id?: string): string {
  // Map the language if needed
  const mappedLanguage = LANGUAGE_MAPPING[language] || language

  // Clean the endpoint (remove leading/trailing slashes)
  const cleanEndpoint = endpoint.replace(/^\/|\/$/g, "")

  // Add ID if provided
  const pathWithId = id ? `${cleanEndpoint}/${id}/` : `${cleanEndpoint}/`

  // Return the full URL
  return `${API_BASE_URL}/${mappedLanguage}/api/${pathWithId}`
}

// Helper function to get basic headers (no auth)
export function getHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
}

// Helper function to make API requests
export async function makeApiRequest(
  endpoint: string,
  method: string,
  language: string,
  data?: any,
  id?: string,
): Promise<any> {
  const url = formatApiUrl(endpoint, language, id)

  console.log(`Making ${method} request to: ${url}`)
  if (data) {
    console.log("Request data:", data)
  }

  const options: RequestInit = {
    method,
    headers: getHeaders(),
  }

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, options)
    console.log(`Response status: ${response.status}`)

    if (!response.ok) {
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
      return {}
    }

    // Try to parse JSON response
    try {
      const responseData = await response.json()
      console.log("Response data:", responseData)
      return responseData
    } catch (e) {
      // If the response is not JSON, return an empty object
      return {}
    }
  } catch (error) {
    console.error(`Error with ${method} request to ${url}:`, error)
    throw error
  }
}
