// Create the edit page for users
"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EditUserPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { users, updateUser } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roles: {
      admin: false,
      journalist: false,
    },
  })
  const [localFormData, setLocalFormData] = useState({
    name: "",
    email: "",
    roles: {
      admin: false,
      journalist: false,
    },
  })
  const userId = params.id as string

  // Load user data
  const loadUser = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const apiLanguage = language === "ru" ? "uz" : language
      const apiUrl = `https://uzfk.uz/${apiLanguage}/api/users/${userId}/`

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(typeof window !== "undefined" && localStorage.getItem("authToken")
            ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            : {}),
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const userData = await response.json()

      setLocalFormData({
        name: userData.username || userData.login || "",
        email: userData.email || "",
        roles: {
          admin: userData.role === "Administrator" || userData.groups?.some((g: any) => g.name === "Administrator"),
          journalist: userData.role === "journalist" || userData.groups?.some((g: any) => g.name === "journalist"),
        },
      })
      setFormData({
        name: userData.username || userData.login || "",
        email: userData.email || "",
        roles: {
          admin: userData.role === "Administrator" || userData.groups?.some((g: any) => g.name === "Administrator"),
          journalist: userData.role === "journalist" || userData.groups?.some((g: any) => g.name === "journalist"),
        },
      })
    } catch (error) {
      console.error("Error fetching user:", error)
      setError("Failed to load user data. Using fallback data.")

      // Set fallback data in case of error
      const fallbackData = {
        name: "User " + userId,
        email: "user@example.com",
        roles: {
          admin: false,
          journalist: false,
        },
      }

      setLocalFormData(fallbackData)
      setFormData(fallbackData)
    } finally {
      setIsLoading(false)
    }
  }, [userId, language, toast])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFormData({
      ...localFormData,
      roles: { ...localFormData.roles, [e.target.name]: e.target.checked },
    })
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const apiLanguage = language === "ru" ? "uz" : language
      const apiUrl = `https://uzfk.uz/${apiLanguage}/api/users/${userId}/`

      const userData = {
        username: localFormData.name,
        email: localFormData.email,
        groups: [
          ...(localFormData.roles.admin ? ["Administrator"] : []),
          ...(localFormData.roles.journalist ? ["journalist"] : []),
        ],
      }

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(typeof window !== "undefined" && localStorage.getItem("authToken")
            ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            : {}),
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      setFormData(localFormData)
      toast({
        title: "Success",
        description: "User updated successfully",
      })
      router.push("/dashboard/users")
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackClick = () => {
    router.push("/dashboard/users")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">{t("editUser")}</h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-1">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle>{t("edit")}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={localFormData.name}
                      onChange={handleInputChange}
                      placeholder={t("name")}
                      className="dark:bg-gray-700 dark:border-gray-600"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      value={localFormData.email}
                      onChange={handleInputChange}
                      placeholder={t("email")}
                      className="dark:bg-gray-700 dark:border-gray-600"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("roles")}</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="admin"
                          name="admin"
                          checked={localFormData.roles.admin}
                          onCheckedChange={(checked) =>
                            setLocalFormData({
                              ...localFormData,
                              roles: { ...localFormData.roles, admin: checked as boolean },
                            })
                          }
                          disabled={isLoading}
                        />
                        <label htmlFor="admin" className="text-sm">
                          Администрация
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="journalist"
                          name="journalist"
                          checked={localFormData.roles.journalist}
                          onCheckedChange={(checked) =>
                            setLocalFormData({
                              ...localFormData,
                              roles: { ...localFormData.roles, journalist: checked as boolean },
                            })
                          }
                          disabled={isLoading}
                        />
                        <label htmlFor="journalist" className="text-sm">
                          Журналист
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="mr-2"
                      onClick={handleBackClick}
                      disabled={isLoading}
                    >
                      {t("cancel")}
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("saving")}
                        </div>
                      ) : (
                        t("save")
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
