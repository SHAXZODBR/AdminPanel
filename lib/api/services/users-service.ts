// User interface
export interface User {
  id: string
  username: string
  email: string
  full_name?: string
  date_joined?: string
  is_active?: boolean
  role?: string
}

// Create user request
export interface CreateUserRequest {
  username: string
  email: string
  password: string
  full_name?: string
}

// Update user request
export interface UpdateUserRequest {
  email?: string
  full_name?: string
  password?: string
  is_active?: boolean
}

// API response interface
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

// Paginated response interface
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/**
 * Users service for handling user-related API calls
 */
export const usersService = {
  /**
   * Get all users
   */
  async getAll(language = "uz"): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      // Mock response for development
      return {
        success: true,
        data: {
          count: 5,
          next: null,
          previous: null,
          results: [
            {
              id: "1",
              username: "admin",
              email: "admin@example.com",
              date_joined: "2023-01-01T10:00:00Z",
              is_active: true,
              role: "admin",
            },
            {
              id: "2",
              username: "manager",
              email: "manager@example.com",
              date_joined: "2023-02-15T14:30:00Z",
              is_active: true,
              role: "manager",
            },
            {
              id: "3",
              username: "editor",
              email: "editor@example.com",
              date_joined: "2023-03-20T09:15:00Z",
              is_active: true,
              role: "editor",
            },
            {
              id: "4",
              username: "user1",
              email: "user1@example.com",
              date_joined: "2023-04-05T11:45:00Z",
              is_active: true,
              role: "user",
            },
            {
              id: "5",
              username: "user2",
              email: "user2@example.com",
              date_joined: "2023-05-12T16:20:00Z",
              is_active: true,
              role: "user",
            },
          ],
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch users",
      }
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      return {
        success: true,
        data: {
          id: "1",
          username: "admin",
          email: "admin@example.com",
          date_joined: "2023-01-01T10:00:00Z",
          is_active: true,
          role: "admin",
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch current user",
      }
    }
  },

  /**
   * Get user by ID
   */
  async getById(id: string): Promise<ApiResponse<User>> {
    try {
      return {
        success: true,
        data: {
          id,
          username: "admin",
          email: "admin@example.com",
          date_joined: "2023-01-01T10:00:00Z",
          is_active: true,
          role: "admin",
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch user",
      }
    }
  },

  /**
   * Create a new user
   */
  async create(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    try {
      return {
        success: true,
        data: {
          id: Date.now().toString(),
          username: userData.username,
          email: userData.email,
          full_name: userData.full_name,
          date_joined: new Date().toISOString(),
          is_active: true,
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create user",
      }
    }
  },

  /**
   * Update a user
   */
  async update(id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    try {
      return {
        success: true,
        data: {
          id,
          username: "admin",
          email: userData.email || "admin@example.com",
          full_name: userData.full_name,
          date_joined: "2023-01-01T10:00:00Z",
          is_active: userData.is_active !== undefined ? userData.is_active : true,
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update user",
      }
    }
  },

  /**
   * Delete a user
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete user",
      }
    }
  },
}
