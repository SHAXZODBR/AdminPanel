"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

export default function AddUserPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const { addUser } = useStore()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.login || !formData.password) {
      toast({
        title: "Error",
        description: "Login and password are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Add user to store
    addUser({ login: formData.login })

    toast({
      title: "Success",
      description: "User has been created successfully",
    })

    setIsLoading(false)
    router.push("/dashboard/users")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">{t("addUser")}</h2>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
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
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("password")}</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={t("password")}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

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
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-[#e91e63]" disabled={isLoading}>
                  {isLoading ? t("saving") : t("save")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

