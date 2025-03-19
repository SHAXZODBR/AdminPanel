/**
 * API Service Layer
 *
 * This file contains all the API calls to the backend.
 * Currently using mock data, but you can replace these functions
 * with actual API calls to your backend.
 *
 * HOW TO USE:
 * 1. Replace the mock implementations with actual API calls
 * 2. Update the return types and error handling as needed
 * 3. Keep the function signatures the same to minimize changes in components
 */

import {
  type User,
  type Leader,
  type Tag,
  type Category,
  type Article,
  type Department,
  type SubordinateOrganization,
  type RegionalCouncil,
  mockUsers,
  mockLeaders,
  mockTags,
  mockCategories,
  mockArticles,
  mockDepartments,
  mockSubordinateOrganizations,
  mockRegionalCouncils,
} from "@/lib/data"

// Helper to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Format current date for created timestamps
export const getFormattedDate = () => {
  const now = new Date()
  return `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`
}

// Generate a unique ID
export const generateUniqueId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9)
}

// ==================== USERS API ====================

/**
 * Fetch all users
 *
 * @returns Promise<User[]> - List of users
 *
 * REPLACE WITH:
 * return fetch('/api/users').then(res => res.json());
 */
export const fetchUsers = async (): Promise<User[]> => {
  await delay(300) // Simulate network delay
  return [...mockUsers]
}

/**
 * Add a new user
 *
 * @param user - User data without id and createdAt
 * @returns Promise<User> - Created user with id and createdAt
 *
 * REPLACE WITH:
 * return fetch('/api/users', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(user)
 * }).then(res => res.json());
 */
export const addUser = async (user: Omit<User, "id" | "createdAt">): Promise<User> => {
  await delay(300)
  const newUser: User = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...user,
  }
  return newUser
}

/**
 * Update an existing user
 *
 * @param id - User ID
 * @param userData - Partial user data to update
 * @returns Promise<User> - Updated user
 *
 * REPLACE WITH:
 * return fetch(`/api/users/${id}`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(userData)
 * }).then(res => res.json());
 */
export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  await delay(300)
  const user = mockUsers.find((u) => u.id === id)
  if (!user) throw new Error("User not found")

  const updatedUser = { ...user, ...userData }
  return updatedUser
}

/**
 * Delete a user
 *
 * @param id - User ID
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/users/${id}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete user');
 * });
 */
export const deleteUser = async (id: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the user from the database
  return
}

// ==================== LEADERS API ====================

/**
 * Fetch all leaders for a specific language
 *
 * @param language - Language code (en, ru, uz)
 * @returns Promise<Leader[]> - List of leaders
 *
 * REPLACE WITH:
 * return fetch(`/api/leaders?language=${language}`).then(res => res.json());
 */
export const fetchLeaders = async (language: string): Promise<Leader[]> => {
  await delay(300)
  return [...(mockLeaders[language] || [])]
}

/**
 * Add a new leader
 *
 * @param leader - Leader data without id and createdAt
 * @returns Promise<Leader> - Created leader with id and createdAt
 *
 * REPLACE WITH:
 * return fetch('/api/leaders', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(leader)
 * }).then(res => res.json());
 */
export const addLeader = async (leader: Omit<Leader, "id" | "createdAt">): Promise<Leader> => {
  await delay(300)
  const newLeader: Leader = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...leader,
  }
  return newLeader
}

/**
 * Update an existing leader
 *
 * @param id - Leader ID
 * @param language - Language code (en, ru, uz)
 * @param leaderData - Partial leader data to update
 * @returns Promise<Leader> - Updated leader
 *
 * REPLACE WITH:
 * return fetch(`/api/leaders/${id}`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ language, ...leaderData })
 * }).then(res => res.json());
 */
export const updateLeader = async (id: string, language: string, leaderData: Partial<Leader>): Promise<Leader> => {
  await delay(300)

  // Find the leader in the specified language
  const leader = mockLeaders[language]?.find((l) => l.id === id)

  if (!leader) {
    // If not found in the specified language, search in all languages
    for (const lang of Object.keys(mockLeaders)) {
      const foundLeader = mockLeaders[lang].find((l) => l.id === id)
      if (foundLeader) {
        // Create a new leader in the target language
        const updatedLeader: Leader = {
          ...foundLeader,
          ...leaderData,
          language: language as "en" | "ru" | "uz",
        }
        return updatedLeader
      }
    }
    throw new Error("Leader not found")
  }

  // Update the leader in the current language
  const updatedLeader = { ...leader, ...leaderData }
  return updatedLeader
}

/**
 * Delete a leader
 *
 * @param id - Leader ID
 * @param language - Language code (en, ru, uz)
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/leaders/${id}?language=${language}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete leader');
 * });
 */
export const deleteLeader = async (id: string, language: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the leader from the database
  return
}

// ==================== TAGS API ====================

/**
 * Fetch all tags for a specific language
 *
 * @param language - Language code (en, ru, uz)
 * @returns Promise<Tag[]> - List of tags
 *
 * REPLACE WITH:
 * return fetch(`/api/tags?language=${language}`).then(res => res.json());
 */
export const fetchTags = async (language: string): Promise<Tag[]> => {
  await delay(300)
  return [...(mockTags[language] || [])]
}

/**
 * Add a new tag
 *
 * @param tag - Tag data without id and createdAt
 * @returns Promise<Tag> - Created tag with id and createdAt
 *
 * REPLACE WITH:
 * return fetch('/api/tags', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(tag)
 * }).then(res => res.json());
 */
export const addTag = async (tag: Omit<Tag, "id" | "createdAt">): Promise<Tag> => {
  await delay(300)
  const newTag: Tag = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...tag,
  }
  return newTag
}

/**
 * Update an existing tag
 *
 * @param id - Tag ID
 * @param language - Language code (en, ru, uz)
 * @param tagData - Partial tag data to update
 * @returns Promise<Tag> - Updated tag
 *
 * REPLACE WITH:
 * return fetch(`/api/tags/${id}`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ language, ...tagData })
 * }).then(res => res.json());
 */
export const updateTag = async (id: string, language: string, tagData: Partial<Tag>): Promise<Tag> => {
  await delay(300)

  // Find the tag in the specified language
  const tag = mockTags[language]?.find((t) => t.id === id)

  if (!tag) {
    // If not found in the specified language, search in all languages
    for (const lang of Object.keys(mockTags)) {
      const foundTag = mockTags[lang].find((t) => t.id === id)
      if (foundTag) {
        // Create a new tag in the target language
        const updatedTag: Tag = {
          ...foundTag,
          ...tagData,
          language: language as "en" | "ru" | "uz",
        }
        return updatedTag
      }
    }
    throw new Error("Tag not found")
  }

  // Update the tag in the current language
  const updatedTag = { ...tag, ...tagData }
  return updatedTag
}

/**
 * Delete a tag
 *
 * @param id - Tag ID
 * @param language - Language code (en, ru, uz)
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/tags/${id}?language=${language}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete tag');
 * });
 */
export const deleteTag = async (id: string, language: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the tag from the database
  return
}

// ==================== CATEGORIES API ====================

/**
 * Fetch all categories for a specific language
 *
 * @param language - Language code (en, ru, uz)
 * @returns Promise<Category[]> - List of categories
 *
 * REPLACE WITH:
 * return fetch(`/api/categories?language=${language}`).then(res => res.json());
 */
export const fetchCategories = async (language: string): Promise<Category[]> => {
  await delay(300)
  return [...(mockCategories[language] || [])]
}

/**
 * Add a new category
 *
 * @param category - Category data without id and createdAt
 * @returns Promise<Category> - Created category with id and createdAt
 *
 * REPLACE WITH:
 * return fetch('/api/categories', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(category)
 * }).then(res => res.json());
 */
export const addCategory = async (category: Omit<Category, "id" | "createdAt">): Promise<Category> => {
  await delay(300)
  const newCategory: Category = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...category,
  }
  return newCategory
}

/**
 * Update an existing category
 *
 * @param id - Category ID
 * @param language - Language code (en, ru, uz)
 * @param categoryData - Partial category data to update
 * @returns Promise<Category> - Updated category
 *
 * REPLACE WITH:
 * return fetch(`/api/categories/${id}`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ language, ...categoryData })
 * }).then(res => res.json());
 */
export const updateCategory = async (
  id: string,
  language: string,
  categoryData: Partial<Category>,
): Promise<Category> => {
  await delay(300)

  // Find the category in the specified language
  const category = mockCategories[language]?.find((c) => c.id === id)

  if (!category) {
    // If not found in the specified language, search in all languages
    for (const lang of Object.keys(mockCategories)) {
      const foundCategory = mockCategories[lang].find((c) => c.id === id)
      if (foundCategory) {
        // Create a new category in the target language
        const updatedCategory: Category = {
          ...foundCategory,
          ...categoryData,
          language: language as "en" | "ru" | "uz",
        }
        return updatedCategory
      }
    }
    throw new Error("Category not found")
  }

  // Update the category in the current language
  const updatedCategory = { ...category, ...categoryData }
  return updatedCategory
}

/**
 * Delete a category
 *
 * @param id - Category ID
 * @param language - Language code (en, ru, uz)
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/categories/${id}?language=${language}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete category');
 * });
 */
export const deleteCategory = async (id: string, language: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the category from the database
  return
}

// ==================== ARTICLES API ====================

/**
 * Fetch all articles for a specific language
 *
 * @param language - Language code (en, ru, uz)
 * @returns Promise<Article[]> - List of articles
 *
 * REPLACE WITH:
 * return fetch(`/api/articles?language=${language}`).then(res => res.json());
 */
export const fetchArticles = async (language: string): Promise<Article[]> => {
  await delay(300)
  return [...(mockArticles[language] || [])]
}

/**
 * Add a new article
 *
 * @param article - Article data without id and createdAt
 * @returns Promise<Article> - Created article with id and createdAt
 *
 * REPLACE WITH:
 * // For file uploads, use FormData
 * const formData = new FormData();
 * Object.entries(article).forEach(([key, value]) => {
 *   if (value instanceof File) {
 *     formData.append(key, value);
 *   } else if (typeof value === 'object') {
 *     formData.append(key, JSON.stringify(value));
 *   } else {
 *     formData.append(key, String(value));
 *   }
 * });
 *
 * return fetch('/api/articles', {
 *   method: 'POST',
 *   body: formData
 * }).then(res => res.json());
 */
export const addArticle = async (article: Omit<Article, "id" | "createdAt">): Promise<Article> => {
  await delay(300)
  const newArticle: Article = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...article,
  }
  return newArticle
}

/**
 * Update an existing article
 *
 * @param id - Article ID
 * @param language - Language code (en, ru, uz)
 * @param articleData - Partial article data to update
 * @returns Promise<Article> - Updated article
 *
 * REPLACE WITH:
 * // For file uploads, use FormData
 * const formData = new FormData();
 * formData.append('language', language);
 * Object.entries(articleData).forEach(([key, value]) => {
 *   if (value instanceof File) {
 *     formData.append(key, value);
 *   } else if (typeof value === 'object') {
 *     formData.append(key, JSON.stringify(value));
 *   } else {
 *     formData.append(key, String(value));
 *   }
 * });
 *
 * return fetch(`/api/articles/${id}`, {
 *   method: 'PUT',
 *   body: formData
 * }).then(res => res.json());
 */
export const updateArticle = async (id: string, language: string, articleData: Partial<Article>): Promise<Article> => {
  await delay(300)

  // Find the article in the specified language
  const article = mockArticles[language]?.find((a) => a.id === id)

  if (!article) {
    // If not found in the specified language, search in all languages
    for (const lang of Object.keys(mockArticles)) {
      const foundArticle = mockArticles[lang].find((a) => a.id === id)
      if (foundArticle) {
        // Create a new article in the target language
        const updatedArticle: Article = {
          ...foundArticle,
          ...articleData,
          language: language as "en" | "ru" | "uz",
        }
        return updatedArticle
      }
    }
    throw new Error("Article not found")
  }

  // Update the article in the current language
  const updatedArticle = { ...article, ...articleData }
  return updatedArticle
}

/**
 * Delete an article
 *
 * @param id - Article ID
 * @param language - Language code (en, ru, uz)
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/articles/${id}?language=${language}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete article');
 * });
 */
export const deleteArticle = async (id: string, language: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the article from the database
  return
}

// ==================== DEPARTMENTS API ====================

/**
 * Fetch all departments for a specific language
 *
 * @param language - Language code (en, ru, uz)
 * @returns Promise<Department[]> - List of departments
 *
 * REPLACE WITH:
 * return fetch(`/api/departments?language=${language}`).then(res => res.json());
 */
export const fetchDepartments = async (language: string): Promise<Department[]> => {
  await delay(300)
  return [...(mockDepartments[language] || [])]
}

/**
 * Add a new department
 *
 * @param department - Department data without id and createdAt
 * @returns Promise<Department> - Created department with id and createdAt
 *
 * REPLACE WITH:
 * return fetch('/api/departments', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(department)
 * }).then(res => res.json());
 */
export const addDepartment = async (department: Omit<Department, "id" | "createdAt">): Promise<Department> => {
  await delay(300)
  const newDepartment: Department = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...department,
  }
  return newDepartment
}

/**
 * Update an existing department
 *
 * @param id - Department ID
 * @param language - Language code (en, ru, uz)
 * @param departmentData - Partial department data to update
 * @returns Promise<Department> - Updated department
 *
 * REPLACE WITH:
 * return fetch(`/api/departments/${id}`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ language, ...departmentData })
 * }).then(res => res.json());
 */
export const updateDepartment = async (
  id: string,
  language: string,
  departmentData: Partial<Department>,
): Promise<Department> => {
  await delay(300)

  // Find the department in the specified language
  const department = mockDepartments[language]?.find((d) => d.id === id)

  if (!department) {
    // If not found in the specified language, search in all languages
    for (const lang of Object.keys(mockDepartments)) {
      const foundDepartment = mockDepartments[lang].find((d) => d.id === id)
      if (foundDepartment) {
        // Create a new department in the target language
        const updatedDepartment: Department = {
          ...foundDepartment,
          ...departmentData,
          language: language as "en" | "ru" | "uz",
        }
        return updatedDepartment
      }
    }
    throw new Error("Department not found")
  }

  // Update the department in the current language
  const updatedDepartment = { ...department, ...departmentData }
  return updatedDepartment
}

/**
 * Delete a department
 *
 * @param id - Department ID
 * @param language - Language code (en, ru, uz)
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/departments/${id}?language=${language}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete department');
 * });
 */
export const deleteDepartment = async (id: string, language: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the department from the database
  return
}

// ==================== SUBORDINATE ORGANIZATIONS API ====================

/**
 * Fetch all subordinate organizations for a specific language
 *
 * @param language - Language code (en, ru, uz)
 * @returns Promise<SubordinateOrganization[]> - List of subordinate organizations
 *
 * REPLACE WITH:
 * return fetch(`/api/subordinate-organizations?language=${language}`).then(res => res.json());
 */
export const fetchSubordinateOrganizations = async (language: string): Promise<SubordinateOrganization[]> => {
  await delay(300)
  return [...(mockSubordinateOrganizations[language] || [])]
}

/**
 * Add a new subordinate organization
 *
 * @param org - Subordinate organization data without id and createdAt
 * @returns Promise<SubordinateOrganization> - Created subordinate organization with id and createdAt
 *
 * REPLACE WITH:
 * return fetch('/api/subordinate-organizations', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(org)
 * }).then(res => res.json());
 */
export const addSubordinateOrganization = async (
  org: Omit<SubordinateOrganization, "id" | "createdAt">,
): Promise<SubordinateOrganization> => {
  await delay(300)
  const newOrg: SubordinateOrganization = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...org,
  }
  return newOrg
}

/**
 * Update an existing subordinate organization
 *
 * @param id - Subordinate organization ID
 * @param language - Language code (en, ru, uz)
 * @param orgData - Partial subordinate organization data to update
 * @returns Promise<SubordinateOrganization> - Updated subordinate organization
 *
 * REPLACE WITH:
 * return fetch(`/api/subordinate-organizations/${id}`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ language, ...orgData })
 * }).then(res => res.json());
 */
export const updateSubordinateOrganization = async (
  id: string,
  language: string,
  orgData: Partial<SubordinateOrganization>,
): Promise<SubordinateOrganization> => {
  await delay(300)

  // Find the organization in the specified language
  const org = mockSubordinateOrganizations[language]?.find((o) => o.id === id)

  if (!org) {
    // If not found in the specified language, search in all languages
    for (const lang of Object.keys(mockSubordinateOrganizations)) {
      const foundOrg = mockSubordinateOrganizations[lang].find((o) => o.id === id)
      if (foundOrg) {
        // Create a new organization in the target language
        const updatedOrg: SubordinateOrganization = {
          ...foundOrg,
          ...orgData,
          language: language as "en" | "ru" | "uz",
        }
        return updatedOrg
      }
    }
    throw new Error("Subordinate organization not found")
  }

  // Update the organization in the current language
  const updatedOrg = { ...org, ...orgData }
  return updatedOrg
}

/**
 * Delete a subordinate organization
 *
 * @param id - Subordinate organization ID
 * @param language - Language code (en, ru, uz)
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/subordinate-organizations/${id}?language=${language}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete subordinate organization');
 * });
 */
export const deleteSubordinateOrganization = async (id: string, language: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the subordinate organization from the database
  return
}

// ==================== REGIONAL COUNCILS API ====================

/**
 * Fetch all regional councils for a specific language
 *
 * @param language - Language code (en, ru, uz)
 * @returns Promise<RegionalCouncil[]> - List of regional councils
 *
 * REPLACE WITH:
 * return fetch(`/api/regional-councils?language=${language}`).then(res => res.json());
 */
export const fetchRegionalCouncils = async (language: string): Promise<RegionalCouncil[]> => {
  await delay(300)
  return [...(mockRegionalCouncils[language] || [])]
}

/**
 * Add a new regional council
 *
 * @param council - Regional council data without id and createdAt
 * @returns Promise<RegionalCouncil> - Created regional council with id and createdAt
 *
 * REPLACE WITH:
 * return fetch('/api/regional-councils', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(council)
 * }).then(res => res.json());
 */
export const addRegionalCouncil = async (
  council: Omit<RegionalCouncil, "id" | "createdAt">,
): Promise<RegionalCouncil> => {
  await delay(300)
  const newCouncil: RegionalCouncil = {
    id: generateUniqueId(),
    createdAt: getFormattedDate(),
    ...council,
  }
  return newCouncil
}

/**
 * Update an existing regional council
 *
 * @param id - Regional council ID
 * @param language - Language code (en, ru, uz)
 * @param councilData - Partial regional council data to update
 * @returns Promise<RegionalCouncil> - Updated regional council
 *
 * REPLACE WITH:
 * return fetch(`/api/regional-councils/${id}`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ language, ...councilData })
 * }).then(res => res.json());
 */
export const updateRegionalCouncil = async (
  id: string,
  language: string,
  councilData: Partial<RegionalCouncil>,
): Promise<RegionalCouncil> => {
  await delay(300)

  // Find the council in the specified language
  const council = mockRegionalCouncils[language]?.find((c) => c.id === id)

  if (!council) {
    // If not found in the specified language, search in all languages
    for (const lang of Object.keys(mockRegionalCouncils)) {
      const foundCouncil = mockRegionalCouncils[lang].find((c) => c.id === id)
      if (foundCouncil) {
        // Create a new council in the target language
        const updatedCouncil: RegionalCouncil = {
          ...foundCouncil,
          ...councilData,
          language: language as "en" | "ru" | "uz",
        }
        return updatedCouncil
      }
    }
    throw new Error("Regional council not found")
  }

  // Update the council in the current language
  const updatedCouncil = { ...council, ...councilData }
  return updatedCouncil
}

/**
 * Delete a regional council
 *
 * @param id - Regional council ID
 * @param language - Language code (en, ru, uz)
 * @returns Promise<void>
 *
 * REPLACE WITH:
 * return fetch(`/api/regional-councils/${id}?language=${language}`, {
 *   method: 'DELETE'
 * }).then(res => {
 *   if (!res.ok) throw new Error('Failed to delete regional council');
 * });
 */
export const deleteRegionalCouncil = async (id: string, language: string): Promise<void> => {
  await delay(300)
  // In a real API, this would delete the regional council from the database
  return
}

// ==================== FILE UPLOAD API ====================

/**
 * Upload a file to the server
 *
 * @param file - File to upload
 * @param type - Type of file (image, document, etc.)
 * @returns Promise<string> - URL of the uploaded file
 *
 * REPLACE WITH:
 * const formData = new FormData();
 * formData.append('file', file);
 * formData.append('type', type);
 *
 * return fetch('/api/upload', {
 *   method: 'POST',
 *   body: formData
 * })
 * .then(res => res.json())
 * .then(data => data.url);
 */
export const uploadFile = async (file: File, type: string): Promise<string> => {
  await delay(500)
  // Mock URL for the uploaded file
  return `/uploads/${type}/${file.name}`
}

