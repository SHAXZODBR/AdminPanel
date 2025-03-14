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
      moderator: false,
      journalist: false,
      russian: false,
    },
    newPassword: "",
  })

  useEffect(() => {
    const userId = params.id as string
    const user = users.find((u) => u.id === userId)

    if (user) {
      setFormData({
        name: user.login, // Using login as name since we don't have a name field in the mock data
        login: user.login,
        roles: {
          admin: user.login === "administrator", // Just for demo purposes
          moderator: false,
          journalist: false,
          russian: false,
        },
        newPassword: "",
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

    setIsLoading(true)

    // In a real app, you would update the password in the database
    // For this demo, we'll just show a success message

    toast({
      title: "Success",
      description: "Password has been changed successfully",
    })

    setIsLoading(false)
    setFormData((prev) => ({ ...prev, newPassword: "" }))
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
                      id="moderator"
                      checked={formData.roles.moderator}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          roles: { ...formData.roles, moderator: checked as boolean },
                        })
                      }
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
                    />
                    <label htmlFor="russian" className="text-sm">
                      Русский язык
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
                  <Input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder={t("newPassword")}
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

