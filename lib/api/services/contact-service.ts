/**
 * Contact Service
 *
 * Service for interacting with the contact API endpoints.
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from "../api-client"
import API_ENDPOINTS from "../endpoints"

// Contact interface
export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  status?: "new" | "read" | "responded"
  type?: string
  value?: string
  description?: string
}

// Create contact request
export interface CreateContactRequest {
  name: string
  email: string
  phone?: string
  message: string
  type?: string
  value?: string
  description?: string
}

// Update contact request
export interface UpdateContactRequest {
  name?: string
  email?: string
  phone?: string
  message?: string
  status?: "new" | "read" | "responded"
  type?: string
  value?: string
  description?: string
}

/**
 * Contact service for handling contact-related API calls
 */
class ContactService {
  /**
   * Get all contacts
   */
  async getAll(): Promise<ApiResponse<PaginatedResponse<Contact>>> {
    return apiClient.get<PaginatedResponse<Contact>>(API_ENDPOINTS.CONTACT.BASE)
  }

  /**
   * Get contact by ID
   */
  async getById(id: string): Promise<ApiResponse<Contact>> {
    return apiClient.get<Contact>(API_ENDPOINTS.CONTACT.BY_ID(id))
  }

  /**
   * Create a new contact
   */
  async create(contactData: CreateContactRequest): Promise<ApiResponse<Contact>> {
    return apiClient.post<Contact>(API_ENDPOINTS.CONTACT.BASE, contactData)
  }

  /**
   * Update a contact
   */
  async update(id: string, contactData: UpdateContactRequest): Promise<ApiResponse<Contact>> {
    return apiClient.put<Contact>(API_ENDPOINTS.CONTACT.BY_ID(id), contactData)
  }

  /**
   * Partially update a contact
   */
  async partialUpdate(id: string, contactData: Partial<UpdateContactRequest>): Promise<ApiResponse<Contact>> {
    return apiClient.patch<Contact>(API_ENDPOINTS.CONTACT.BY_ID(id), contactData)
  }

  /**
   * Delete a contact
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.CONTACT.BY_ID(id))
  }
}

export const contactService = new ContactService()
export default contactService
