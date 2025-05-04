/**
 * API Usage Example
 *
 * This file shows how to use the API service in your components.
 * Copy and adapt these examples to your components.
 */

import { apiService } from "./api-service"

// Example: Fetching users
async function fetchUsers(language: string, setUsers: any, setError: any, setIsLoading: any) {
  setIsLoading(true)
  setError(null)

  try {
    // Call the API service
    const response = await apiService.users.getAll(language)

    // Process the response
    const userData = Array.isArray(response) ? response : response.results || []

    // Format the data for your component
    const formattedUsers = userData.map((user: any) => ({
      id: user.id?.toString() || Math.random().toString(36).substring(2, 9),
      login: user.username || user.login || "",
      username: user.username || user.login || "",
      email: user.email || "",
      createdAt: user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "",
      role: user.role || user.groups?.[0]?.name || "User",
      isActive: user.is_active !== undefined ? user.is_active : true,
    }))

    // Update your state
    setUsers(formattedUsers)
  } catch (error) {
    console.error(`Error fetching users:`, error)
    setError("Failed to load users")
  } finally {
    setIsLoading(false)
  }
}

// Example: Deleting a user
async function deleteUser(id: string, language: string, users: any[], setUsers: any, toast: any, t: any) {
  try {
    // Call the API service
    await apiService.users.delete(id, language)

    // Update your state immediately
    setUsers(users.filter((user) => user.id !== id))

    // Show success message
    toast({
      title: t("success"),
      description: t("userDeletedSuccessfully"),
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    toast({
      title: t("error"),
      description: t("errorDeletingUser"),
      variant: "destructive",
    })
  }
}

// Example: Creating an article
async function createArticle(articleData: any, language: string, router: any, toast: any, t: any) {
  try {
    // Call the API service
    const response = await apiService.content.create(articleData, language)

    // Show success message
    toast({
      title: t("success"),
      description: t("articleCreatedSuccessfully"),
    })

    // Navigate to the articles list
    router.push("/dashboard/articles")
  } catch (error) {
    console.error("Error creating article:", error)
    toast({
      title: t("error"),
      description: t("errorCreatingArticle"),
      variant: "destructive",
    })
  }
}

// Example: Updating an article
async function updateArticle(id: string, articleData: any, language: string, router: any, toast: any, t: any) {
  try {
    // Call the API service
    const response = await apiService.content.update(id, articleData, language)

    // Show success message
    toast({
      title: t("success"),
      description: t("articleUpdatedSuccessfully"),
    })

    // Navigate to the articles list
    router.push("/dashboard/articles")
  } catch (error) {
    console.error("Error updating article:", error)
    toast({
      title: t("error"),
      description: t("errorUpdatingArticle"),
      variant: "destructive",
    })
  }
}
