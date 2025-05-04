// API endpoints configuration
export const API_ENDPOINTS = {
  // Base URL for the API
  BASE_URL: "https://uzfk.uz/api",

  // Users endpoints
  USERS: {
    BASE: "/users",
    GET_ME: "/users/get-me",
    BY_ID: (id: string) => `/users/${id}`,
  },

  // Leadership endpoints
  LEADERSHIP: {
    BASE: "/leadership",
    BY_ID: (id: string) => `/leadership/${id}`,
  },

  // Content endpoints
  CONTENT: {
    BASE: "/content",
    BY_ID: (id: string) => `/content/${id}`,
  },

  // Sector and Department endpoints
  SECTOR_AND_DEPARTMENT: {
    BASE: "/sector-and-department",
    BY_ID: (id: string) => `/sector-and-department/${id}`,
  },

  // Organization endpoints
  ORGANIZATION: {
    BASE: "/organization",
    BY_ID: (id: string) => `/organization/${id}`,
  },

  // Local Council endpoints
  LOCAL_COUNCIL: {
    BASE: "/local-council",
    BY_ID: (id: string) => `/local-council/${id}`,
  },

  // Social Networks endpoints
  SOCIAL_NETWORKS: {
    BASE: "/social-networks",
    BY_ID: (id: string) => `/social-networks/${id}`,
  },

  // Contact endpoints
  CONTACT: {
    BASE: "/contact",
    BY_ID: (id: string) => `/contact/${id}`,
  },

  // YouTube Videos endpoints - Updated to correct path
  YOUTUBE_VIDEOS: {
    BASE: "/admin/youtube-videos",
    BY_ID: (id: string) => `/admin/youtube-videos/${id}`,
  },

  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
}
