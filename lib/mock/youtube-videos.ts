/**
 * Mock YouTube Video Service
 *
 * This service provides mock data for YouTube videos when the real API is unavailable.
 */

// Mock YouTube video data
const mockYouTubeVideos = [
  {
    id: "1",
    title: "Introduction to Our Organization",
    video_id: "dQw4w9WgXcQ",
    description: "Learn about our mission and values",
    is_active: true,
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-01-15T10:30:00Z",
    language: "en",
  },
  {
    id: "2",
    title: "Annual Conference Highlights",
    video_id: "xvFZjo5PgG0",
    description: "Key moments from our annual conference",
    is_active: true,
    created_at: "2023-03-22T14:15:00Z",
    updated_at: "2023-03-22T14:15:00Z",
    language: "en",
  },
  {
    id: "3",
    title: "Наши достижения за 2023 год",
    video_id: "bTqVqk7FSmY",
    description: "Обзор наших основных достижений за прошедший год",
    is_active: true,
    created_at: "2023-12-10T09:45:00Z",
    updated_at: "2023-12-10T09:45:00Z",
    language: "ru",
  },
  {
    id: "4",
    title: "Tashkilotimiz haqida",
    video_id: "jNQXAC9IVRw",
    description: "Bizning tashkilotimiz haqida ma'lumot",
    is_active: true,
    created_at: "2023-05-05T11:20:00Z",
    updated_at: "2023-05-05T11:20:00Z",
    language: "uz",
  },
  {
    id: "5",
    title: "Ташкилотимиз ҳақида",
    video_id: "jNQXAC9IVRw",
    description: "Бизнинг ташкилотимиз ҳақида маълумот",
    is_active: true,
    created_at: "2023-05-05T11:20:00Z",
    updated_at: "2023-05-05T11:20:00Z",
    language: "uz-cyrl",
  },
]

// YouTube videos service
export const youtubeVideoService = {
  // Get all YouTube videos
  getAll: async (language = "uz") => {
    console.log(`[Mock] Getting all YouTube videos for language: ${language}`)

    // Filter videos by language if specified
    const filteredVideos = language
      ? mockYouTubeVideos.filter((video) => video.language === language)
      : mockYouTubeVideos

    return {
      results: filteredVideos,
      count: filteredVideos.length,
      next: null,
      previous: null,
    }
  },

  // Get YouTube video by ID
  getById: async (id: string, language = "uz") => {
    console.log(`[Mock] Getting YouTube video by ID: ${id}, language: ${language}`)

    const video = mockYouTubeVideos.find((v) => v.id === id)

    if (!video) {
      throw new Error(`Video with ID ${id} not found`)
    }

    return video
  },

  // Create a new YouTube video
  create: async (data: any, language = "uz") => {
    console.log(`[Mock] Creating new YouTube video, language: ${language}`, data)

    const newVideo = {
      id: (mockYouTubeVideos.length + 1).toString(),
      title: data.title || "New Video",
      video_id: data.video_id || "dQw4w9WgXcQ",
      description: data.description || "",
      is_active: data.is_active !== undefined ? data.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      language: language,
    }

    return newVideo
  },

  // Update a YouTube video
  update: async (id: string, data: any, language = "uz") => {
    console.log(`[Mock] Updating YouTube video ${id}, language: ${language}`, data)

    const video = mockYouTubeVideos.find((v) => v.id === id)

    if (!video) {
      throw new Error(`Video with ID ${id} not found`)
    }

    const updatedVideo = {
      ...video,
      ...data,
      updated_at: new Date().toISOString(),
    }

    return updatedVideo
  },

  // Partially update a YouTube video
  patch: async (id: string, data: any, language = "uz") => {
    console.log(`[Mock] Patching YouTube video ${id}, language: ${language}`, data)

    const video = mockYouTubeVideos.find((v) => v.id === id)

    if (!video) {
      throw new Error(`Video with ID ${id} not found`)
    }

    const updatedVideo = {
      ...video,
      ...data,
      updated_at: new Date().toISOString(),
    }

    return updatedVideo
  },

  // Delete a YouTube video
  delete: async (id: string, language = "uz") => {
    console.log(`[Mock] Deleting YouTube video ${id}, language: ${language}`)
    return { success: true }
  },
}
