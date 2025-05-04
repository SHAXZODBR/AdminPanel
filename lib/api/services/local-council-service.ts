/**
 * Local Council Service
 *
 * Service for interacting with the local-council API endpoints.
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from "../api-client"
import API_ENDPOINTS from "../endpoints"

// Local Council interface
export interface LocalCouncil {
  id: string
  name: string
  region?: string
  contact_info?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
  language?: string
}

// Create local council request
export interface CreateLocalCouncilRequest {
  name: string
  region?: string
  contact_info?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
}

// Update local council request
export interface UpdateLocalCouncilRequest {
  name?: string
  region?: string
  contact_info?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
}

/**
 * Local Council service for handling local council-related API calls
 */
class LocalCouncilService {
  /**
   * Get all local councils
   */
  async getAll(): Promise<ApiResponse<PaginatedResponse<LocalCouncil>>> {
    return apiClient.get<PaginatedResponse<LocalCouncil>>(API_ENDPOINTS.LOCAL_COUNCIL.BASE)
  }

  /**
   * Get local council by ID
   */
  async getById(id: string): Promise<ApiResponse<LocalCouncil>> {
    return apiClient.get<LocalCouncil>(API_ENDPOINTS.LOCAL_COUNCIL.BY_ID(id))
  }

  /**
   * Create a new local council
   */
  async create(councilData: CreateLocalCouncilRequest): Promise<ApiResponse<LocalCouncil>> {
    return apiClient.post<LocalCouncil>(API_ENDPOINTS.LOCAL_COUNCIL.BASE, councilData)
  }

  /**
   * Update a local council
   */
  async update(id: string, councilData: UpdateLocalCouncilRequest): Promise<ApiResponse<LocalCouncil>> {
    return apiClient.put<LocalCouncil>(API_ENDPOINTS.LOCAL_COUNCIL.BY_ID(id), councilData)
  }

  /**
   * Partially update a local council
   */
  async partialUpdate(id: string, councilData: Partial<UpdateLocalCouncilRequest>): Promise<ApiResponse<LocalCouncil>> {
    return apiClient.patch<LocalCouncil>(API_ENDPOINTS.LOCAL_COUNCIL.BY_ID(id), councilData)
  }

  /**
   * Delete a local council
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.LOCAL_COUNCIL.BY_ID(id))
  }
}

export const localCouncilService = new LocalCouncilService()
export default localCouncilService
