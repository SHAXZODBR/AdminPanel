"use client"

import type React from "react"

import { createContext, useState, useContext, type ReactNode, useEffect, useCallback, useRef } from "react"

// Define types for all entities
export type User = {
  id: string
  login: string
  username?: string
  email?: string
  createdAt: string
}

export type Leader = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  fullName: string
  position: string
  phoneNumber: string
  email: string
  bio: string
  photo?: string
  createdAt: string
}

export type Tag = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  alias: string
  createdAt: string
}

export type Category = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  parent: string
  position: number
  createdAt: string
}

export type Article = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  title: string
  category: string
  image: string
  author: string
  views: number
  createdAt: string
  content?: string
}

export type Department = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  type: "department" | "sector"
  head: string
  phoneNumber: string
  email: string
  createdAt: string
}

export type SubordinateOrganization = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  type: "organization" | "institution"
  head: string
  phoneNumber: string
  email: string
  address: string
  createdAt: string
}

export type RegionalCouncil = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  region: string
  head: string
  phoneNumber: string
  email: string
  address: string
  createdAt: string
}

export type NewsItem = {
  id: string
  title: string
  content: string
  category: string
  date: string
  language: string
  images?: string[]
}

type StoreContextType = {
  users: User[]
  leaders: Record<string, Leader[]>
  tags: Record<string, Tag[]>
  categories: Record<string, Category[]>
  articles: Record<string, Article[]>
  departments: Record<string, Department[]>
  subordinateOrganizations: Record<string, SubordinateOrganization[]>
  regionalCouncils: Record<string, RegionalCouncil[]>
  news: NewsItem[]
  loading: Record<string, boolean>
  setLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>

  addUser: (user: Omit<User, "id" | "createdAt">) => Promise<User>
  updateUser: (id: string, userData: Partial<User>) => Promise<User>
  deleteUser: (id: string) => Promise<void>

  addLeader: (leader: Omit<Leader, "id" | "createdAt">) => Promise<Leader>
  updateLeader: (id: string, language: string, leaderData: Partial<Leader>) => Promise<Leader>
  deleteLeader: (id: string, language: string) => Promise<void>

  addTag: (tag: Omit<Tag, "id" | "createdAt">) => Promise<Tag>
  updateTag: (id: string, language: string, tagData: Partial<Tag>) => Promise<Tag>
  deleteTag: (id: string, language: string) => Promise<void>

  addCategory: (category: Omit<Category, "id" | "createdAt">) => Promise<Category>
  updateCategory: (id: string, language: string, categoryData: Partial<Category>) => Promise<Category>
  deleteCategory: (id: string, language: string) => Promise<void>

  addArticle: (article: Omit<Article, "id" | "createdAt">) => Promise<Article>
  updateArticle: (id: string, language: string, articleData: Partial<Article>) => Promise<Article>
  deleteArticle: (id: string) => Promise<void>

  addDepartment: (department: Omit<Department, "id" | "createdAt">) => Promise<Department>
  updateDepartment: (id: string, language: string, departmentData: Partial<Department>) => Promise<Department>
  deleteDepartment: (id: string) => Promise<void>

  addSubordinateOrganization: (
    org: Omit<SubordinateOrganization, "id" | "createdAt">,
  ) => Promise<SubordinateOrganization>
  updateSubordinateOrganization: (
    id: string,
    language: string,
    orgData: Partial<SubordinateOrganization>,
  ) => Promise<SubordinateOrganization>
  deleteSubordinateOrganization: (id: string) => Promise<void>

  addRegionalCouncil: (council: Omit<RegionalCouncil, "id" | "createdAt">) => Promise<RegionalCouncil>
  updateRegionalCouncil: (
    id: string,
    language: string,
    councilData: Partial<RegionalCouncil>,
  ) => Promise<RegionalCouncil>
  deleteRegionalCouncil: (id: string) => Promise<void>

  // News operations
  addNews: (news: NewsItem) => Promise<NewsItem>
  updateNews: (id: string, newsData: Partial<NewsItem>) => Promise<NewsItem>
  deleteNews: (id: string) => Promise<void>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Generate a unique ID
const generateUniqueId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9)
}

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

export function StoreProvider({ children }: { children: ReactNode }) {
  // Initialize state with empty arrays
  const [users, setUsers] = useState<User[]>([])
  const [leaders, setLeaders] = useState<Record<string, Leader[]>>({ en: [], ru: [], uz: [], "uz-cyrl": [] })
  const [tags, setTags] = useState<Record<string, Tag[]>>({ en: [], ru: [], uz: [], "uz-cyrl": [] })
  const [categories, setCategories] = useState<Record<string, Category[]>>({ en: [], ru: [], uz: [], "uz-cyrl": [] })
  const [articles, setArticles] = useState<Record<string, Article[]>>({ en: [], ru: [], uz: [], "uz-cyrl": [] })
  const [departments, setDepartments] = useState<Record<string, Department[]>>({
    en: [],
    ru: [],
    uz: [],
    "uz-cyrl": [],
  })
  const [subordinateOrganizations, setSubordinateOrganizations] = useState<Record<string, SubordinateOrganization[]>>({
    en: [],
    ru: [],
    uz: [],
    "uz-cyrl": [],
  })
  const [regionalCouncils, setRegionalCouncils] = useState<Record<string, RegionalCouncil[]>>({
    en: [],
    ru: [],
    uz: [],
    "uz-cyrl": [],
  })
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState<Record<string, boolean>>({
    users: false,
    leaders: false,
    tags: false,
    categories: false,
    articles: false,
    departments: false,
    subordinateOrganizations: false,
    regionalCouncils: false,
    news: false,
  })

  // Add a ref to track operation timeouts
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({})

  // Cleanup function for timeouts
  const clearAllTimeouts = useCallback(() => {
    Object.values(timeoutsRef.current).forEach((timeout) => {
      clearTimeout(timeout)
    })
    timeoutsRef.current = {}
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts()
    }
  }, [clearAllTimeouts])

  // User operations with timeout handling
  const addUser = async (user: Omit<User, "id" | "createdAt">) => {
    // Set a timeout to ensure the operation completes
    return new Promise<User>((resolve, reject) => {
      try {
        const newUser: User = {
          id: generateUniqueId(),
          login: user.login,
          username: user.username || user.login,
          email: user.email || "",
          createdAt: getFormattedDate(),
        }

        setUsers((prev) => [newUser, ...prev])
        resolve(newUser)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Fix the updateUser function to handle updates immediately
  const updateUser = async (id: string, userData: Partial<User>) => {
    return new Promise<User>((resolve, reject) => {
      try {
        const userIndex = users.findIndex((user) => user.id === id)

        if (userIndex === -1) {
          console.warn(`User with ID ${id} not found in store. Returning existing state.`)
          reject(new Error("User not found"))
          return
        }

        const updatedUser = {
          ...users[userIndex],
          ...userData,
          // Ensure these fields are properly updated
          login: userData.login || users[userIndex].login,
          username: userData.username || userData.login || users[userIndex].username || users[userIndex].login,
        }

        // Create a new array with the updated user
        const newUsers = [...users]
        newUsers[userIndex] = updatedUser

        // Update the state immediately to prevent UI lag
        setUsers(newUsers)

        // Resolve with the updated user
        resolve(updatedUser)
      } catch (error) {
        reject(error)
      }
    })
  }

  const deleteUser = async (id: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setUsers((prev) => prev.filter((user) => user.id !== id))
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  // Leader operations
  const addLeader = async (leader: Omit<Leader, "id" | "createdAt">) => {
    const newLeader: Leader = {
      id: generateUniqueId(),
      language: leader.language,
      fullName: leader.fullName,
      position: leader.position,
      phoneNumber: leader.phoneNumber,
      email: leader.email,
      bio: leader.bio,
      photo: leader.photo,
      createdAt: getFormattedDate(),
    }
    setLeaders((prev) => ({
      ...prev,
      [leader.language]: [newLeader, ...(prev[leader.language] || [])],
    }))
    return newLeader
  }

  // Also update the other entity update functions with a similar delay pattern
  const updateLeader = async (id: string, language: string, leaderData: Partial<Leader>) => {
    return new Promise<Leader>((resolve, reject) => {
      try {
        const updatedLeader = leaders[language]?.find((leader) => leader.id === id)
        if (!updatedLeader) throw new Error("Leader not found")

        const newLeader = { ...updatedLeader, ...leaderData }

        // Add a slight delay to simulate API call
        setTimeout(() => {
          setLeaders((prev) => ({
            ...prev,
            [language]: prev[language].map((leader) => (leader.id === id ? newLeader : leader)),
          }))
          resolve(newLeader)
        }, 300)
      } catch (error) {
        reject(error)
      }
    })
  }

  const deleteLeader = async (id: string, language: string) => {
    setLeaders((prev) => ({
      ...prev,
      [language]: prev[language].filter((leader) => leader.id !== id),
    }))
  }

  // Tag operations
  const addTag = async (tag: Omit<Tag, "id" | "createdAt">) => {
    const newTag: Tag = {
      id: generateUniqueId(),
      language: tag.language,
      name: tag.name,
      alias: tag.alias,
      createdAt: getFormattedDate(),
    }
    setTags((prev) => ({
      ...prev,
      [tag.language]: [newTag, ...(prev[tag.language] || [])],
    }))
    return newTag
  }

  const updateTag = async (id: string, language: string, tagData: Partial<Tag>) => {
    const updatedTag = tags[language]?.find((tag) => tag.id === id)
    if (!updatedTag) throw new Error("Tag not found")

    const newTag = { ...updatedTag, ...tagData }
    setTags((prev) => ({
      ...prev,
      [language]: prev[language].map((tag) => (tag.id === id ? newTag : tag)),
    }))
    return newTag
  }

  const deleteTag = async (id: string, language: string) => {
    setTags((prev) => ({
      ...prev,
      [language]: prev[language].filter((tag) => tag.id !== id),
    }))
  }

  // Category operations
  const addCategory = async (category: Omit<Category, "id" | "createdAt">) => {
    const newCategory: Category = {
      id: generateUniqueId(),
      language: category.language,
      name: category.name,
      parent: category.parent,
      position: category.position,
      createdAt: getFormattedDate(),
    }
    setCategories((prev) => ({
      ...prev,
      [category.language]: [newCategory, ...(prev[category.language] || [])],
    }))
    return newCategory
  }

  const updateCategory = async (id: string, language: string, categoryData: Partial<Category>) => {
    const updatedCategory = categories[language]?.find((category) => category.id === id)
    if (!updatedCategory) throw new Error("Category not found")

    const newCategory = { ...updatedCategory, ...categoryData }
    setCategories((prev) => ({
      ...prev,
      [language]: prev[language].map((category) => (category.id === id ? newCategory : category)),
    }))
    return newCategory
  }

  const deleteCategory = async (id: string, language: string) => {
    setCategories((prev) => ({
      ...prev,
      [language]: prev[language].filter((category) => category.id !== id),
    }))
  }

  // Article operations
  const addArticle = async (article: Omit<Article, "id" | "createdAt">) => {
    const newArticle: Article = {
      id: generateUniqueId(),
      language: article.language,
      title: article.title,
      category: article.category,
      image: article.image,
      author: article.author,
      views: article.views || 0,
      content: article.content,
      createdAt: getFormattedDate(),
    }
    setArticles((prev) => ({
      ...prev,
      [article.language]: [newArticle, ...(prev[article.language] || [])],
    }))
    return newArticle
  }

  const updateArticle = async (id: string, language: string, articleData: Partial<Article>) => {
    const updatedArticle = articles[language]?.find((article) => article.id === id)
    if (!updatedArticle) throw new Error("Article not found")

    const newArticle = { ...updatedArticle, ...articleData }
    setArticles((prev) => ({
      ...prev,
      [language]: prev[language].map((article) => (article.id === id ? newArticle : article)),
    }))
    return newArticle
  }

  const deleteArticle = async (id: string, language: string) => {
    setArticles((prev) => ({
      ...prev,
      [language]: prev[language].filter((article) => article.id !== id),
    }))
  }

  // Department operations
  const addDepartment = async (department: Omit<Department, "id" | "createdAt">) => {
    const newDepartment: Department = {
      id: generateUniqueId(),
      language: department.language,
      name: department.name,
      type: department.type,
      head: department.head,
      phoneNumber: department.phoneNumber,
      email: department.email,
      createdAt: getFormattedDate(),
    }
    setDepartments((prev) => ({
      ...prev,
      [department.language]: [newDepartment, ...(prev[department.language] || [])],
    }))
    return newDepartment
  }

  const updateDepartment = async (id: string, language: string, departmentData: Partial<Department>) => {
    const updatedDepartment = departments[language]?.find((department) => department.id === id)
    if (!updatedDepartment) throw new Error("Department not found")

    const newDepartment = { ...updatedDepartment, ...departmentData }
    setDepartments((prev) => ({
      ...prev,
      [language]: prev[language].map((department) => (department.id === id ? newDepartment : department)),
    }))
    return newDepartment
  }

  const deleteDepartment = async (id: string, language: string) => {
    setDepartments((prev) => ({
      ...prev,
      [language]: prev[language].filter((department) => department.id !== id),
    }))
  }

  // Subordinate Organization operations
  const addSubordinateOrganization = async (org: Omit<SubordinateOrganization, "id" | "createdAt">) => {
    const newOrg: SubordinateOrganization = {
      id: generateUniqueId(),
      language: org.language,
      name: org.name,
      type: org.type,
      head: org.head,
      phoneNumber: org.phoneNumber,
      email: org.email,
      address: org.address,
      createdAt: getFormattedDate(),
    }
    setSubordinateOrganizations((prev) => ({
      ...prev,
      [org.language]: [newOrg, ...(prev[org.language] || [])],
    }))
    return newOrg
  }

  const updateSubordinateOrganization = async (
    id: string,
    language: string,
    orgData: Partial<SubordinateOrganization>,
  ) => {
    const updatedOrg = subordinateOrganizations[language]?.find((org) => org.id === id)
    if (!updatedOrg) throw new Error("Subordinate Organization not found")

    const newOrg = { ...updatedOrg, ...orgData }
    setSubordinateOrganizations((prev) => ({
      ...prev,
      [language]: prev[language].map((org) => (org.id === id ? newOrg : org)),
    }))
    return newOrg
  }

  const deleteSubordinateOrganization = async (id: string, language: string) => {
    setSubordinateOrganizations((prev) => ({
      ...prev,
      [language]: prev[language].filter((org) => org.id !== id),
    }))
  }

  // Regional Council operations
  const addRegionalCouncil = async (council: Omit<RegionalCouncil, "id" | "createdAt">) => {
    const newCouncil: RegionalCouncil = {
      id: generateUniqueId(),
      language: council.language,
      name: council.name,
      region: council.region,
      head: council.head,
      phoneNumber: council.phoneNumber,
      email: council.email,
      address: council.address,
      createdAt: getFormattedDate(),
    }
    setRegionalCouncils((prev) => ({
      ...prev,
      [council.language]: [newCouncil, ...(prev[council.language] || [])],
    }))
    return newCouncil
  }

  const updateRegionalCouncil = async (id: string, language: string, councilData: Partial<RegionalCouncil>) => {
    const updatedCouncil = regionalCouncils[language]?.find((council) => council.id === id)
    if (!updatedCouncil) throw new Error("Regional Council not found")

    const newCouncil = { ...updatedCouncil, ...councilData }
    setRegionalCouncils((prev) => ({
      ...prev,
      [language]: prev[language].map((council) => (council.id === id ? newCouncil : council)),
    }))
    return newCouncil
  }

  const deleteRegionalCouncil = async (id: string, language: string) => {
    setRegionalCouncils((prev) => ({
      ...prev,
      [language]: prev[language].filter((council) => council.id !== id),
    }))
  }

  // News operations
  const addNews = async (newsItem: NewsItem) => {
    const newNewsItem: NewsItem = {
      ...newsItem,
      id: generateUniqueId(),
    }
    setNews((prev) => [newNewsItem, ...prev])
    return newNewsItem
  }

  const updateNews = async (id: string, newsData: Partial<NewsItem>) => {
    const updatedNews = news.find((item) => item.id === id)
    if (!updatedNews) throw new Error("News item not found")

    const newNewsItem = { ...updatedNews, ...newsData }
    setNews((prev) => prev.map((item) => (item.id === id ? newNewsItem : item)))
    return newNewsItem
  }

  const deleteNews = async (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id))
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
        news,
        loading,
        setLoading,

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

        addNews,
        updateNews,
        deleteNews,
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
