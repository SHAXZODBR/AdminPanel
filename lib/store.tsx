"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  mockUsers,
  mockLeaders,
  mockTags,
  mockCategories,
  mockArticles,
  mockDepartments,
  type User,
  type Leader,
  type Tag,
  type Category,
  type Article,
  type Department,
  mockSubordinateOrganizations,
  mockRegionalCouncils,
  type SubordinateOrganization,
  type RegionalCouncil,
} from "@/lib/data"

type StoreContextType = {
  users: User[]
  leaders: Record<string, Leader[]>
  tags: Record<string, Tag[]>
  categories: Record<string, Category[]>
  articles: Record<string, Article[]>
  departments: Record<string, Department[]>
  subordinateOrganizations: Record<string, SubordinateOrganization[]>
  regionalCouncils: Record<string, RegionalCouncil[]>

  addUser: (user: Omit<User, "id" | "createdAt">) => void
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void

  addLeader: (leader: Omit<Leader, "id" | "createdAt">) => void
  updateLeader: (id: string, language: string, leaderData: Partial<Leader>) => void
  deleteLeader: (id: string, language: string) => void

  addTag: (tag: Omit<Tag, "id" | "createdAt">) => void
  updateTag: (id: string, language: string, tagData: Partial<Tag>) => void
  deleteTag: (id: string, language: string) => void

  addCategory: (category: Omit<Category, "id" | "createdAt">) => void
  updateCategory: (id: string, language: string, categoryData: Partial<Category>) => void
  deleteCategory: (id: string, language: string) => void

  addArticle: (article: Omit<Article, "id" | "createdAt">) => void
  updateArticle: (id: string, language: string, articleData: Partial<Article>) => void
  deleteArticle: (id: string, language: string) => void

  addDepartment: (department: Omit<Department, "id" | "createdAt">) => void
  updateDepartment: (id: string, language: string, departmentData: Partial<Department>) => void
  deleteDepartment: (id: string, language: string) => void

  addSubordinateOrganization: (org: Omit<SubordinateOrganization, "id" | "createdAt">) => void
  updateSubordinateOrganization: (id: string, language: string, orgData: Partial<SubordinateOrganization>) => void
  deleteSubordinateOrganization: (id: string, language: string) => void

  addRegionalCouncil: (council: Omit<RegionalCouncil, "id" | "createdAt">) => void
  updateRegionalCouncil: (id: string, language: string, councilData: Partial<RegionalCouncil>) => void
  deleteRegionalCouncil: (id: string, language: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [leaders, setLeaders] = useState<Record<string, Leader[]>>(mockLeaders)
  const [tags, setTags] = useState<Record<string, Tag[]>>(mockTags)
  const [categories, setCategories] = useState<Record<string, Category[]>>(mockCategories)
  const [articles, setArticles] = useState<Record<string, Article[]>>(mockArticles)
  const [departments, setDepartments] = useState<Record<string, Department[]>>(mockDepartments)
  const [subordinateOrganizations, setSubordinateOrganizations] =
    useState<Record<string, SubordinateOrganization[]>>(mockSubordinateOrganizations)
  const [regionalCouncils, setRegionalCouncils] = useState<Record<string, RegionalCouncil[]>>(mockRegionalCouncils)

  // Format current date for created timestamps
  const getFormattedDate = () => {
    const now = new Date()
    return `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  }

  // Generate a unique ID
  const generateUniqueId = () => {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9)
  }

  // User operations
  const addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      id: generateUniqueId(),
      createdAt: getFormattedDate(),
      ...user,
    }
    setUsers((prev) => [...prev, newUser])
  }

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers((prev) => {
      const updated = prev.map((user) => (user.id === id ? { ...user, ...userData } : user))
      return [...updated] // Return a new array to ensure re-render
    })
  }

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  // Leader operations
  const addLeader = (leader: Omit<Leader, "id" | "createdAt">) => {
    const language = leader.language

    // Generate a unique ID for the new leader
    const newId = generateUniqueId()

    const newLeader: Leader = {
      id: newId,
      createdAt: getFormattedDate(),
      ...leader,
    }

    setLeaders((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Add the new leader to the language-specific array
      newState[language] = [...newState[language], newLeader]

      return newState
    })
  }

  const updateLeader = (id: string, language: string, leaderData: Partial<Leader>) => {
    setLeaders((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Find the leader in the current language
      const leaderExists = newState[language].some((leader) => leader.id === id)

      if (leaderExists) {
        // Update the leader in the language-specific array
        newState[language] = newState[language].map((leader) =>
          leader.id === id ? { ...leader, ...leaderData } : leader,
        )
      } else {
        // If changing language, remove from old language and add to new one
        let foundLeader = null
        let foundLanguage = ""

        // Find the leader in any language
        for (const lang of Object.keys(newState)) {
          const leader = newState[lang].find((l) => l.id === id)
          if (leader) {
            foundLeader = leader
            foundLanguage = lang
            break
          }
        }

        if (foundLeader && foundLanguage) {
          // Remove from old language
          newState[foundLanguage] = newState[foundLanguage].filter((l) => l.id !== id)

          // Add to new language with updates
          const updatedLeader = { ...foundLeader, ...leaderData, language: language as "en" | "ru" | "uz" }
          if (!newState[language]) {
            newState[language] = []
          }
          newState[language] = [...newState[language], updatedLeader]
        }
      }

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const deleteLeader = (id: string, language: string) => {
    setLeaders((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Check if the language key exists
      if (!newState[language]) {
        return prev
      }

      // Remove the leader from the language-specific array
      newState[language] = newState[language].filter((leader) => leader.id !== id)

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  // Tag operations
  const addTag = (tag: Omit<Tag, "id" | "createdAt">) => {
    const language = tag.language

    // Generate a unique ID for the new tag
    const newId = generateUniqueId()

    const newTag: Tag = {
      id: newId,
      createdAt: getFormattedDate(),
      ...tag,
    }

    setTags((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Add the new tag to the language-specific array
      newState[language] = [...newState[language], newTag]

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const updateTag = (id: string, language: string, tagData: Partial<Tag>) => {
    setTags((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Find the tag in the current language
      const tagExists = newState[language].some((tag) => tag.id === id)

      if (tagExists) {
        // Update the tag in the language-specific array
        newState[language] = newState[language].map((tag) => (tag.id === id ? { ...tag, ...tagData } : tag))
      } else {
        // If changing language, remove from old language and add to new one
        let foundTag = null
        let foundLanguage = ""

        // Find the tag in any language
        for (const lang of Object.keys(newState)) {
          const tag = newState[lang].find((t) => t.id === id)
          if (tag) {
            foundTag = tag
            foundLanguage = lang
            break
          }
        }

        if (foundTag && foundLanguage) {
          // Remove from old language
          newState[foundLanguage] = newState[foundLanguage].filter((t) => t.id !== id)

          // Add to new language with updates
          const updatedTag = { ...foundTag, ...tagData, language: language as "en" | "ru" | "uz" }
          if (!newState[language]) {
            newState[language] = []
          }
          newState[language] = [...newState[language], updatedTag]
        }
      }

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const deleteTag = (id: string, language: string) => {
    setTags((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Check if the language key exists
      if (!newState[language]) {
        return prev
      }

      // Remove the tag from the language-specific array
      newState[language] = newState[language].filter((tag) => tag.id !== id)

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  // Category operations
  const addCategory = (category: Omit<Category, "id" | "createdAt">) => {
    const language = category.language

    // Generate a unique ID for the new category
    const newId = generateUniqueId()

    const newCategory: Category = {
      id: newId,
      createdAt: getFormattedDate(),
      ...category,
    }

    setCategories((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Add the new category to the language-specific array
      newState[language] = [...newState[language], newCategory]

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const updateCategory = (id: string, language: string, categoryData: Partial<Category>) => {
    setCategories((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Find the category in the current language
      const categoryExists = newState[language].some((category) => category.id === id)

      if (categoryExists) {
        // Update the category in the language-specific array
        newState[language] = newState[language].map((category) =>
          category.id === id ? { ...category, ...categoryData } : category,
        )
      } else {
        // If changing language, remove from old language and add to new one
        let foundCategory = null
        let foundLanguage = ""

        // Find the category in any language
        for (const lang of Object.keys(newState)) {
          const category = newState[lang].find((c) => c.id === id)
          if (category) {
            foundCategory = category
            foundLanguage = lang
            break
          }
        }

        if (foundCategory && foundLanguage) {
          // Remove from old language
          newState[foundLanguage] = newState[foundLanguage].filter((c) => c.id !== id)

          // Add to new language with updates
          const updatedCategory = { ...foundCategory, ...categoryData, language: language as "en" | "ru" | "uz" }
          if (!newState[language]) {
            newState[language] = []
          }
          newState[language] = [...newState[language], updatedCategory]
        }
      }

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const deleteCategory = (id: string, language: string) => {
    setCategories((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Check if the language key exists
      if (!newState[language]) {
        return prev
      }

      // Remove the category from the language-specific array
      newState[language] = newState[language].filter((category) => category.id !== id)

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  // Article operations
  const addArticle = (article: Omit<Article, "id" | "createdAt">) => {
    const language = article.language

    // Generate a unique ID for the new article
    const newId = generateUniqueId()

    const newArticle: Article = {
      id: newId,
      createdAt: getFormattedDate(),
      ...article,
    }

    setArticles((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Add the new article to the language-specific array
      newState[language] = [...newState[language], newArticle]

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const updateArticle = (id: string, language: string, articleData: Partial<Article>) => {
    setArticles((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Find the article in the current language
      const articleExists = newState[language].some((article) => article.id === id)

      if (articleExists) {
        // Update the article in the language-specific array
        newState[language] = newState[language].map((article) =>
          article.id === id ? { ...article, ...articleData } : article,
        )
      } else {
        // If changing language, remove from old language and add to new one
        let foundArticle = null
        let foundLanguage = ""

        // Find the article in any language
        for (const lang of Object.keys(newState)) {
          const article = newState[lang].find((a) => a.id === id)
          if (article) {
            foundArticle = article
            foundLanguage = lang
            break
          }
        }

        if (foundArticle && foundLanguage) {
          // Remove from old language
          newState[foundLanguage] = newState[foundLanguage].filter((a) => a.id !== id)

          // Add to new language with updates
          const updatedArticle = { ...foundArticle, ...articleData, language: language as "en" | "ru" | "uz" }
          if (!newState[language]) {
            newState[language] = []
          }
          newState[language] = [...newState[language], updatedArticle]
        }
      }

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const deleteArticle = (id: string, language: string) => {
    setArticles((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Check if the language key exists
      if (!newState[language]) {
        return prev
      }

      // Remove the article from the language-specific array
      newState[language] = newState[language].filter((article) => article.id !== id)

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  // Department operations
  const addDepartment = (department: Omit<Department, "id" | "createdAt">) => {
    const language = department.language

    // Generate a unique ID for the new department
    const newId = generateUniqueId()

    const newDepartment: Department = {
      id: newId,
      createdAt: getFormattedDate(),
      ...department,
    }

    setDepartments((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Add the new department to the language-specific array
      newState[language] = [...newState[language], newDepartment]

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const updateDepartment = (id: string, language: string, departmentData: Partial<Department>) => {
    setDepartments((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Find the department in the current language
      const departmentExists = newState[language].some((department) => department.id === id)

      if (departmentExists) {
        // Update the department in the language-specific array
        newState[language] = newState[language].map((department) =>
          department.id === id ? { ...department, ...departmentData } : department,
        )
      } else {
        // If changing language, remove from old language and add to new one
        let foundDepartment = null
        let foundLanguage = ""

        // Find the department in any language
        for (const lang of Object.keys(newState)) {
          const department = newState[lang].find((d) => d.id === id)
          if (department) {
            foundDepartment = department
            foundLanguage = lang
            break
          }
        }

        if (foundDepartment && foundLanguage) {
          // Remove from old language
          newState[foundLanguage] = newState[foundLanguage].filter((d) => d.id !== id)

          // Add to new language with updates
          const updatedDepartment = { ...foundDepartment, ...departmentData, language: language as "en" | "ru" | "uz" }
          if (!newState[language]) {
            newState[language] = []
          }
          newState[language] = [...newState[language], updatedDepartment]
        }
      }

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const deleteDepartment = (id: string, language: string) => {
    setDepartments((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Check if the language key exists
      if (!newState[language]) {
        return prev
      }

      // Remove the department from the language-specific array
      newState[language] = newState[language].filter((department) => department.id !== id)

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  // Subordinate Organization operations
  const addSubordinateOrganization = (org: Omit<SubordinateOrganization, "id" | "createdAt">) => {
    const language = org.language

    // Generate a unique ID for the new organization
    const newId = generateUniqueId()

    const newOrg: SubordinateOrganization = {
      id: newId,
      createdAt: getFormattedDate(),
      ...org,
    }

    setSubordinateOrganizations((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Add the new organization to the language-specific array
      newState[language] = [...newState[language], newOrg]

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const updateSubordinateOrganization = (id: string, language: string, orgData: Partial<SubordinateOrganization>) => {
    setSubordinateOrganizations((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Find the organization in the current language
      const orgExists = newState[language].some((org) => org.id === id)

      if (orgExists) {
        // Update the organization in the language-specific array
        newState[language] = newState[language].map((org) => (org.id === id ? { ...org, ...orgData } : org))
      } else {
        // If changing language, remove from old language and add to new one
        let foundOrg = null
        let foundLanguage = ""

        // Find the organization in any language
        for (const lang of Object.keys(newState)) {
          const org = newState[lang].find((o) => o.id === id)
          if (org) {
            foundOrg = org
            foundLanguage = lang
            break
          }
        }

        if (foundOrg && foundLanguage) {
          // Remove from old language
          newState[foundLanguage] = newState[foundLanguage].filter((o) => o.id !== id)

          // Add to new language with updates
          const updatedOrg = { ...foundOrg, ...orgData, language: language as "en" | "ru" | "uz" }
          if (!newState[language]) {
            newState[language] = []
          }
          newState[language] = [...newState[language], updatedOrg]
        }
      }

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const deleteSubordinateOrganization = (id: string, language: string) => {
    setSubordinateOrganizations((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Check if the language key exists
      if (!newState[language]) {
        return prev
      }

      // Remove the organization from the language-specific array
      newState[language] = newState[language].filter((org) => org.id !== id)

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  // Regional Council operations
  const addRegionalCouncil = (council: Omit<RegionalCouncil, "id" | "createdAt">) => {
    const language = council.language

    // Generate a unique ID for the new council
    const newId = generateUniqueId()

    const newCouncil: RegionalCouncil = {
      id: newId,
      createdAt: getFormattedDate(),
      ...council,
    }

    setRegionalCouncils((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Add the new council to the language-specific array
      newState[language] = [...newState[language], newCouncil]

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const updateRegionalCouncil = (id: string, language: string, councilData: Partial<RegionalCouncil>) => {
    setRegionalCouncils((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Initialize the language array if it doesn't exist
      if (!newState[language]) {
        newState[language] = []
      }

      // Find the council in the current language
      const councilExists = newState[language].some((council) => council.id === id)

      if (councilExists) {
        // Update the council in the language-specific array
        newState[language] = newState[language].map((council) =>
          council.id === id ? { ...council, ...councilData } : council,
        )
      } else {
        // If changing language, remove from old language and add to new one
        let foundCouncil = null
        let foundLanguage = ""

        // Find the council in any language
        for (const lang of Object.keys(newState)) {
          const council = newState[lang].find((c) => c.id === id)
          if (council) {
            foundCouncil = council
            foundLanguage = lang
            break
          }
        }

        if (foundCouncil && foundLanguage) {
          // Remove from old language
          newState[foundLanguage] = newState[foundLanguage].filter((c) => c.id !== id)

          // Add to new language with updates
          const updatedCouncil = { ...foundCouncil, ...councilData, language: language as "en" | "ru" | "uz" }
          if (!newState[language]) {
            newState[language] = []
          }
          newState[language] = [...newState[language], updatedCouncil]
        }
      }

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  const deleteRegionalCouncil = (id: string, language: string) => {
    setRegionalCouncils((prev) => {
      // Create a new object to ensure React detects the state change
      const newState = { ...prev }

      // Check if the language key exists
      if (!newState[language]) {
        return prev
      }

      // Remove the council from the language-specific array
      newState[language] = newState[language].filter((council) => council.id !== id)

      return { ...newState } // Return a new object to ensure re-render
    })
  }

  return (
    <StoreContext.Provider
      value={{
        users,
        leaders,
        tags,
        categories,
        articles,
        departments,
        subordinateOrganizations,
        regionalCouncils,
        addUser,
        updateUser,
        deleteUser,
        addLeader,
        updateLeader,
        deleteLeader,
        addTag,
        updateTag,
        deleteTag,
        addCategory,
        updateCategory,
        deleteCategory,
        addArticle,
        updateArticle,
        deleteArticle,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addSubordinateOrganization,
        updateSubordinateOrganization,
        deleteSubordinateOrganization,
        addRegionalCouncil,
        updateRegionalCouncil,
        deleteRegionalCouncil,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

