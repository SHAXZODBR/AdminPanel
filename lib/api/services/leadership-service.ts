/**
 * Leadership Service
 *
 * Service for interacting with the leadership API endpoints.
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from "../api-client"
import API_ENDPOINTS from "../endpoints"

// Leadership interface
export interface Leader {
  id: string
  full_name: string
  title: string
  position?: number
  phone_number?: string
  email?: string
  description?: string
  photo?: string
  language?: string
}

// Create leader request
export interface CreateLeaderRequest {
  full_name: string
  title: string
  position?: number
  phone_number?: string
  email?: string
  description?: string
  photo?: string
}

// Update leader request
export interface UpdateLeaderRequest {
  full_name?: string
  title?: string
  position?: number
  phone_number?: string
  email?: string
  description?: string
  photo?: string
}

/**
 * Leadership service for handling leader-related API calls
 */
class LeadershipService {
  /**
   * Get all leaders
   */
  async getAll(): Promise<ApiResponse<PaginatedResponse<Leader>>> {
    return apiClient.get<PaginatedResponse<Leader>>(API_ENDPOINTS.LEADERSHIP.BASE)
  }

  /**
   * Get leader by ID
   */
  async getById(id: string): Promise<ApiResponse<Leader>> {
    return apiClient.get<Leader>(API_ENDPOINTS.LEADERSHIP.BY_ID(id))
  }

  /**
   * Create a new leader
   */
  async create(leaderData: CreateLeaderRequest): Promise<ApiResponse<Leader>> {
    return apiClient.post<Leader>(API_ENDPOINTS.LEADERSHIP.BASE, leaderData)
  }

  /**
   * Update a leader
   */
  async update(id: string, leaderData: UpdateLeaderRequest): Promise<ApiResponse<Leader>> {
    return apiClient.put<Leader>(API_ENDPOINTS.LEADERSHIP.BY_ID(id), leaderData)
  }

  /**
   * Partially update a leader
   */
  async partialUpdate(id: string, leaderData: Partial<UpdateLeaderRequest>): Promise<ApiResponse<Leader>> {
    return apiClient.patch<Leader>(API_ENDPOINTS.LEADERSHIP.BY_ID(id), leaderData)
  }

  /**
   * Delete a leader
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.LEADERSHIP.BY_ID(id))
  }
}

export const leadershipService = new LeadershipService()
export default leadershipService
