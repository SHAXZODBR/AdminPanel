/**
 * Social Network Service
 *
 * Service for interacting with the social-networks API endpoints.
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from "../api-client"
import API_ENDPOINTS from "../endpoints"

// Social Network interface
export interface SocialNetwork {
  id: string
  name: string
  url: string
  icon?: string
  is_active?: boolean
}

// Create social network request
export interface CreateSocialNetworkRequest {
  name: string
  url: string
  icon?: string
  is_active?: boolean
}

// Update social network request
export interface UpdateSocialNetworkRequest {
  name?: string
  url?: string
  icon?: string
  is_active?: boolean
}

/**
 * Social Network service for handling social network-related API calls
 */
class SocialNetworkService {
  /**
   * Get all social networks
   */
  async getAll(): Promise<ApiResponse<PaginatedResponse<SocialNetwork>>> {
    return apiClient.get<PaginatedResponse<SocialNetwork>>(API_ENDPOINTS.SOCIAL_NETWORKS.BASE)
  }

  /**
   * Get social network by ID
   */
  async getById(id: string): Promise<ApiResponse<SocialNetwork>> {
    return apiClient.get<SocialNetwork>(API_ENDPOINTS.SOCIAL_NETWORKS.BY_ID(id))
  }

  /**
   * Create a new social network
   */
  async create(networkData: CreateSocialNetworkRequest): Promise<ApiResponse<SocialNetwork>> {
    return apiClient.post<SocialNetwork>(API_ENDPOINTS.SOCIAL_NETWORKS.BASE, networkData)
  }

  /**
   * Update a social network
   */
  async update(id: string, networkData: UpdateSocialNetworkRequest): Promise<ApiResponse<SocialNetwork>> {
    return apiClient.put<SocialNetwork>(API_ENDPOINTS.SOCIAL_NETWORKS.BY_ID(id), networkData)
  }

  /**
   * Partially update a social network
   */
  async partialUpdate(
    id: string,
    networkData: Partial<UpdateSocialNetworkRequest>,
  ): Promise<ApiResponse<SocialNetwork>> {
    return apiClient.patch<SocialNetwork>(API_ENDPOINTS.SOCIAL_NETWORKS.BY_ID(id), networkData)
  }

  /**
   * Delete a social network
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.SOCIAL_NETWORKS.BY_ID(id))
  }
}

export const socialNetworkService = new SocialNetworkService()
export default socialNetworkService
