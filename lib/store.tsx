"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  mockUsers,
  mockTags,
  mockCategories,
  mockArticles,
  type User,
  type Tag,
  type Category,
  type Article,
} from "@/lib/data"

type StoreContextType = {
  users: User[]
  tags: Record<string, Tag[]>
  categories: Record<string, Category[]>
  articles: Record<string, Article[]>

  addUser: (user: Omit<User, "id" | "createdAt">) => void
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void

  addTag: (tag: Omit<Tag, "id" | "createdAt">) => void
  updateTag: (id: string, language: string, tagData: Partial<Tag>) => void
  deleteTag: (id: string, language: string) => void

  addCategory: (category: Omit<Category, "id" | "createdAt">) => void
  updateCategory: (id: string, language: string, categoryData: Partial<Category>) => void
  deleteCategory: (id: string, language: string) => void

  addArticle: (article: Omit<Article, "id" | "createdAt">) => void
  updateArticle: (id: string, language: string, articleData: Partial<Article>) => void
  deleteArticle: (id: string, language: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [tags, setTags] = useState<Record<string, Tag[]>>(mockTags)
  const [categories, setCategories] = useState<Record<string, Category[]>>(mockCategories)
  const [articles, setArticles] = useState<Record<string, Article[]>>(mockArticles)

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

  // User operations
  const addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      createdAt: getFormattedDate(),
      ...user,
    }
    setUsers((prev) => [...prev, newUser])
  }

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...userData } : user)))
  }

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  // Tag operations
  const addTag = (tag: Omit<Tag, "id" | "createdAt">) => {
    const language = tag.language
    const newTag: Tag = {
      id: (tags[language].length + 1).toString(),
      createdAt: getFormattedDate(),
      ...tag,
    }

    setTags((prev) => ({
      ...prev,
      [language]: [...prev[language], newTag],
    }))
  }

  const updateTag = (id: string, language: string, tagData: Partial<Tag>) => {
    setTags((prev) => ({
      ...prev,
      [language]: prev[language].map((tag) => (tag.id === id ? { ...tag, ...tagData } : tag)),
    }))
  }

  const deleteTag = (id: string, language: string) => {
    setTags((prev) => ({
      ...prev,
      [language]: prev[language].filter((tag) => tag.id !== id),
    }))
  }

  // Category operations
  const addCategory = (category: Omit<Category, "id" | "createdAt">) => {
    const language = category.language
    const newCategory: Category = {
      id: (categories[language].length + 1).toString(),
      createdAt: getFormattedDate(),
      ...category,
    }

    setCategories((prev) => ({
      ...prev,
      [language]: [...prev[language], newCategory],
    }))
  }

  const updateCategory = (id: string, language: string, categoryData: Partial<Category>) => {
    setCategories((prev) => ({
      ...prev,
      [language]: prev[language].map((category) => (category.id === id ? { ...category, ...categoryData } : category)),
    }))
  }

  const deleteCategory = (id: string, language: string) => {
    setCategories((prev) => ({
      ...prev,
      [language]: prev[language].filter((category) => category.id !== id),
    }))
  }

  // Article operations
  const addArticle = (article: Omit<Article, "id" | "createdAt">) => {
    const language = article.language
    const newArticle: Article = {
      id: (articles[language].length + 1).toString(),
      createdAt: getFormattedDate(),
      ...article,
    }

    setArticles((prev) => ({
      ...prev,
      [language]: [...prev[language], newArticle],
    }))
  }

  const updateArticle = (id: string, language: string, articleData: Partial<Article>) => {
    setArticles((prev) => ({
      ...prev,
      [language]: prev[language].map((article) => (article.id === id ? { ...article, ...articleData } : article)),
    }))
  }

  const deleteArticle = (id: string, language: string) => {
    setArticles((prev) => ({
      ...prev,
      [language]: prev[language].filter((article) => article.id !== id),
    }))
  }

  return (
    <StoreContext.Provider
      value={{
        users,
        tags,
        categories,
        articles,
        addUser,
        updateUser,
        deleteUser,
        addTag,
        updateTag,
        deleteTag,
        addCategory,
        updateCategory,
        deleteCategory,
        addArticle,
        updateArticle,
        deleteArticle,
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

