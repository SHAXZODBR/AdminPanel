/**
 * Content Service
 *
 * Service for interacting with the content API endpoints.
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from "../api-client"
import API_ENDPOINTS from "../endpoints"

// Content interface
export interface Content {
  id: string
  title: string
  body: string
  type?: string
  slug?: string
  category?: string
  tags?: string[]
  author?: string
  published_date?: string
  is_published?: boolean
  image?: string
  images?: string[]
  language?: string
}

// Create content request
export interface CreateContentRequest {
  title: string
  body: string
  type?: string
  slug?: string
  category?: string
  tags?: string[]
  author?: string
  published_date?: string
  is_published?: boolean
  image?: string
  images?: string[]
}

// Update content request
export interface UpdateContentRequest {
  title?: string
  body?: string
  type?: string
  slug?: string
  category?: string
  tags?: string[]
  author?: string
  published_date?: string
  is_published?: boolean
  image?: string
  images?: string[]
}

/**
 * Content service for handling content-related API calls
 */
class ContentService {
  /**
   * Get all content items
   */
  async getAll(): Promise<ApiResponse<PaginatedResponse<Content>>> {
    return apiClient.get<PaginatedResponse<Content>>(API_ENDPOINTS.CONTENT.BASE)
  }

  /**
   * Get content by ID
   */
  async getById(id: string): Promise<ApiResponse<Content>> {
    return apiClient.get<Content>(API_ENDPOINTS.CONTENT.BY_ID(id))
  }

  /**
   * Create a new content item
   */
  async create(contentData: CreateContentRequest): Promise<ApiResponse<Content>> {
    return apiClient.post<Content>(API_ENDPOINTS.CONTENT.BASE, contentData)
  }

  /**
   * Update a content item
   */
  async update(id: string, contentData: UpdateContentRequest): Promise<ApiResponse<Content>> {
    return apiClient.put<Content>(API_ENDPOINTS.CONTENT.BY_ID(id), contentData)
  }

  /**
   * Delete a content item
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.CONTENT.BY_ID(id))
  }
}

export const contentService = new ContentService()
export default contentService
