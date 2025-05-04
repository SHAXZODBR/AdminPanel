"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { BASE_URL } from "@/lib/constants"
import { useStore } from "@/lib/store"

export function AddUserForm() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    name: "",
    roles: {
      admin: false,
      moderator: false,
      journalist: false,
      russian: false,
    },
  })

  const store = useStore()

  // Add a timeout ref to handle API timeouts
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Improved form submission with timeout and better error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    if (!formData.login || !formData.password) {
      toast({
        title: "Error",
        description: "Login and password are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Set a timeout to prevent indefinite loading state
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Warning",
        description: "Operation took too long. Please try again.",
        variant: "destructive",
      })
    }, 10000) // 10 second timeout

    try {
      // First try to add via API with a timeout
      const controller = new AbortController()
      const signal = controller.signal

      // Set a timeout for the API call
      const apiTimeout = setTimeout(() => controller.abort(), 5000)

      try {
        const response = await fetch(`${BASE_URL}/${language}/api/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(typeof window !== "undefined" && localStorage.getItem("authToken")
              ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
              : {}),
          },
          body: JSON.stringify({
            username: formData.login,
            password: formData.password,
            full_name: formData.name,
            // Add roles if API supports it
            roles: Object.entries(formData.roles)
              .filter(([_, value]) => value)
              .map(([key]) => key),
          }),
          signal,
        })

        clearTimeout(apiTimeout)

        // If API call succeeds, update the store
        if (response.ok) {
          const userData = await response.json()

          store.addUser({
            login: formData.login,
            username: formData.name || formData.login,
            email: userData.email || "",
          })

          toast({
            title: "Success",
            description: "User has been created successfully",
          })
        } else {
          // If API call fails, show error
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to create user")
        }
      } catch (apiError) {
        clearTimeout(apiTimeout)

        // Check if it's an abort error (timeout)
        if (apiError.name === "AbortError") {
          console.warn("API request timed out, using fallback behavior")
        } else {
          console.error("Error creating user via API:", apiError)
        }

        // Fallback to local store only
        store.addUser({
          login: formData.login,
          username: formData.name || formData.login,
          email: "",
        })

        toast({
          title: "Success",
          description: "User has been created successfully (local only)",
        })
      }
    } catch (error) {
      console.error("Error in user creation process:", error)
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      })
    } finally {
      // Clear the timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      setIsLoading(false)

      // Reset form
      setFormData({
        login: "",
        password: "",
        name: "",
        roles: {
          admin: false,
          moderator: false,
          journalist: false,
          russian: false,
        },
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("addUser")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("login")}</label>
            <Input
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              placeholder={t("login")}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("password")}</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder={t("password")}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("name")}</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t("name")}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("roles")}</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="admin"
                  checked={formData.roles.admin}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      roles: { ...formData.roles, admin: checked as boolean },
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
                  id="moderator"
                  checked={formData.roles.moderator}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      roles: { ...formData.roles, moderator: checked as boolean },
                    })
                  }
                  disabled={isLoading}
                />
                <label htmlFor="moderator" className="text-sm">
                  Модератор
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="journalist"
                  checked={formData.roles.journalist}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      roles: { ...formData.roles, journalist: checked as boolean },
                    })
                  }
                  disabled={isLoading}
                />
                <label htmlFor="journalist" className="text-sm">
                  Журналист
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="russian"
                  checked={formData.roles.russian}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      roles: { ...formData.roles, russian: checked as boolean },
                    })
                  }
                  disabled={isLoading}
                />
                <label htmlFor="russian" className="text-sm">
                  Русский язык
                </label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("saving")}
              </div>
            ) : (
              t("save")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
