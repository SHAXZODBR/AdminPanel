/**
 * Mock Users Data
 *
 * This file provides mock data for users when the real API is unavailable.
 */

// Mock users data
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    full_name: "Admin User",
    date_joined: "2023-01-01T10:00:00Z",
    is_active: true,
    role: "admin",
  },
  {
    id: "2",
    username: "manager",
    email: "manager@example.com",
    full_name: "Manager User",
    date_joined: "2023-02-15T14:30:00Z",
    is_active: true,
    role: "manager",
  },
  {
    id: "3",
    username: "editor",
    email: "editor@example.com",
    full_name: "Editor User",
    date_joined: "2023-03-20T09:15:00Z",
    is_active: true,
    role: "editor",
  },
  {
    id: "4",
    username: "user1",
    email: "user1@example.com",
    full_name: "Regular User 1",
    date_joined: "2023-04-05T11:45:00Z",
    is_active: true,
    role: "user",
  },
  {
    id: "5",
    username: "user2",
    email: "user2@example.com",
    full_name: "Regular User 2",
    date_joined: "2023-05-12T16:20:00Z",
    is_active: true,
    role: "user",
  },
  {
    id: "6",
    username: "inactive",
    email: "inactive@example.com",
    full_name: "Inactive User",
    date_joined: "2023-06-18T08:10:00Z",
    is_active: false,
    role: "user",
  },
]

export default mockUsers
