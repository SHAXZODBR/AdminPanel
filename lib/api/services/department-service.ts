/**
 * Department Service
 *
 * Service for interacting with the sector-and-department API endpoints.
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from "../api-client"
import API_ENDPOINTS from "../endpoints"

// Department interface
export interface Department {
  id: string
  name: string
  type: "sector" | "department"
  parent_id?: number
  head?: string
  phone_number?: string
  email?: string
  language?: string
}

// Create department request
export interface CreateDepartmentRequest {
  name: string
  type: "sector" | "department"
  parent_id?: number
  head?: string
  phone_number?: string
  email?: string
}

// Update department request
export interface UpdateDepartmentRequest {
  name?: string
  type?: "sector" | "department"
  parent_id?: number
  head?: string
  phone_number?: string
  email?: string
}

/**
 * Department service for handling department-related API calls
 */
class DepartmentService {
  /**
   * Get all departments
   */
  async getAll(): Promise<ApiResponse<PaginatedResponse<Department>>> {
    return apiClient.get<PaginatedResponse<Department>>(API_ENDPOINTS.SECTOR_AND_DEPARTMENT.BASE)
  }

  /**
   * Get department by ID
   */
  async getById(id: string): Promise<ApiResponse<Department>> {
    return apiClient.get<Department>(API_ENDPOINTS.SECTOR_AND_DEPARTMENT.BY_ID(id))
  }

  /**
   * Create a new department
   */
  async create(departmentData: CreateDepartmentRequest): Promise<ApiResponse<Department>> {
    return apiClient.post<Department>(API_ENDPOINTS.SECTOR_AND_DEPARTMENT.BASE, departmentData)
  }

  /**
   * Update a department
   */
  async update(id: string, departmentData: UpdateDepartmentRequest): Promise<ApiResponse<Department>> {
    return apiClient.put<Department>(API_ENDPOINTS.SECTOR_AND_DEPARTMENT.BY_ID(id), departmentData)
  }

  /**
   * Partially update a department
   */
  async partialUpdate(id: string, departmentData: Partial<UpdateDepartmentRequest>): Promise<ApiResponse<Department>> {
    return apiClient.patch<Department>(API_ENDPOINTS.SECTOR_AND_DEPARTMENT.BY_ID(id), departmentData)
  }

  /**
   * Delete a department
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.SECTOR_AND_DEPARTMENT.BY_ID(id))
  }
}

export const departmentService = new DepartmentService()
export default departmentService
