import { apiClient } from "../api-client"
import { API_ENDPOINTS } from "../endpoints"

// YouTube video interface
export interface YouTubeVideo {
  id: string
  title: string
  video_id: string
  description?: string
  thumbnail_url?: string
  is_active: boolean
  created_at: string
  updated_at?: string
  language?: string
}

// Response interfaces
export interface YouTubeVideoListResponse {
  count: number
  next: string | null
  previous: string | null
  results: YouTubeVideo[]
}

// YouTube videos service
export const youtubeVideosService = {
  // Get all YouTube videos
  getAll: async (language = "uz") => {
    try {
      return await apiClient.get<YouTubeVideoListResponse>(API_ENDPOINTS.YOUTUBE_VIDEOS.BASE, { language })
    } catch (error) {
      console.error("Error fetching YouTube videos:", error)
      throw error
    }
  },

  // Get YouTube video by ID
  getById: async (id: string, language = "uz") => {
    try {
      return await apiClient.get<YouTubeVideo>(API_ENDPOINTS.YOUTUBE_VIDEOS.BY_ID(id), { language })
    } catch (error) {
      console.error(`Error fetching YouTube video ${id}:`, error)
      throw error
    }
  },

  // Create a new YouTube video
  create: async (data: Partial<YouTubeVideo>, language = "uz") => {
    try {
      return await apiClient.post<YouTubeVideo>(API_ENDPOINTS.YOUTUBE_VIDEOS.BASE, data, { language })
    } catch (error) {
      console.error("Error creating YouTube video:", error)
      throw error
    }
  },

  // Update a YouTube video
  update: async (id: string, data: Partial<YouTubeVideo>, language = "uz") => {
    try {
      return await apiClient.put<YouTubeVideo>(API_ENDPOINTS.YOUTUBE_VIDEOS.BY_ID(id), data, { language })
    } catch (error) {
      console.error(`Error updating YouTube video ${id}:`, error)
      throw error
    }
  },

  // Partially update a YouTube video
  patch: async (id: string, data: Partial<YouTubeVideo>, language = "uz") => {
    try {
      return await apiClient.patch<YouTubeVideo>(API_ENDPOINTS.YOUTUBE_VIDEOS.BY_ID(id), data, { language })
    } catch (error) {
      console.error(`Error patching YouTube video ${id}:`, error)
      throw error
    }
  },

  // Delete a YouTube video
  delete: async (id: string, language = "uz") => {
    try {
      return await apiClient.delete(API_ENDPOINTS.YOUTUBE_VIDEOS.BY_ID(id), { language })
    } catch (error) {
      console.error(`Error deleting YouTube video ${id}:`, error)
      throw error
    }
  },
}
