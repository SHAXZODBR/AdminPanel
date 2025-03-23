"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

export default function EditUserPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { users, updateUser } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    roles: {
      admin: false,
      journalist: false,
    },
    newPassword: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const userId = params.id as string
    const user = users.find((u) => u.id === userId)

    if (user) {
      setFormData({
        name: user.login, // Using login as name since we don't have a name field in the mock data
        login: user.login,
        roles: {
          admin: user.login === "administrator", // Just for demo purposes
          journalist: false,
        },
        newPassword: "",
        confirmPassword: "",
      })
    } else {
      router.push("/dashboard/users")
    }
  }, [params.id, users, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const userId = params.id as string

    // Update user in store
    updateUser(userId, { login: formData.name })

    toast({
      title: "Success",
      description: "User has been updated successfully",
    })

    setIsLoading(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.newPassword) return

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // In a real app, you would update the password in the database
    // For this demo, we'll just show a success message

    toast({
      title: "Success",
      description: "Password has been changed successfully",
    })

    setIsLoading(false)
    setFormData((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }))
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">{t("editUser")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle>{t("edit")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("name")}</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("name")}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

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
                    />
                    <label htmlFor="admin" className="text-sm">
                      Администрация
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
                    />
                    <label htmlFor="journalist" className="text-sm">
                      Мухбир
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#e91e63]" disabled={isLoading}>
                    {isLoading ? t("saving") : t("save")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle>{t("changePassword")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("newPassword")}</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      placeholder={t("newPassword")}
                      className="dark:bg-gray-700 dark:border-gray-600 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("confirmPassword")}</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t("confirmPassword")}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#e91e63]" disabled={isLoading}>
                    {t("changePassword")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

