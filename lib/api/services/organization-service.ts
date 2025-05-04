/**
 * Organization Service
 *
 * Service for interacting with the organization API endpoints.
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from "../api-client"
import API_ENDPOINTS from "../endpoints"

// Organization interface
export interface Organization {
  id: string
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

// Create organization request
export interface CreateOrganizationRequest {
  name: string
  description?: string
  logo?: string
  website?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
  type?: string
}

// Update organization request
export interface UpdateOrganizationRequest {
  name?: string
  description?: string
  logo?: string
  website?: string
  head?: string
  phone_number?: string
  email?: string
  address?: string
  type?: string
}

/**
 * Organization service for handling organization-related API calls
 */
class OrganizationService {
  /**
   * Get all organizations
   */
  async getAll(): Promise<ApiResponse<PaginatedResponse<Organization>>> {
    return apiClient.get<PaginatedResponse<Organization>>(API_ENDPOINTS.ORGANIZATION.BASE)
  }

  /**
   * Get organization by ID
   */
  async getById(id: string): Promise<ApiResponse<Organization>> {
    return apiClient.get<Organization>(API_ENDPOINTS.ORGANIZATION.BY_ID(id))
  }

  /**
   * Create a new organization
   */
  async create(organizationData: CreateOrganizationRequest): Promise<ApiResponse<Organization>> {
    return apiClient.post<Organization>(API_ENDPOINTS.ORGANIZATION.BASE, organizationData)
  }

  /**
   * Update an organization
   */
  async update(id: string, organizationData: UpdateOrganizationRequest): Promise<ApiResponse<Organization>> {
    return apiClient.put<Organization>(API_ENDPOINTS.ORGANIZATION.BY_ID(id), organizationData)
  }

  /**
   * Partially update an organization
   */
  async partialUpdate(
    id: string,
    organizationData: Partial<UpdateOrganizationRequest>,
  ): Promise<ApiResponse<Organization>> {
    return apiClient.patch<Organization>(API_ENDPOINTS.ORGANIZATION.BY_ID(id), organizationData)
  }

  /**
   * Delete an organization
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.ORGANIZATION.BY_ID(id))
  }
}

export const organizationService = new OrganizationService()
export default organizationService
