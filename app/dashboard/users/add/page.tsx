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
    confirmPassword: "",
    name: "",
    roles: {
      admin: false,
      journalist: false,
    },
  })
  const [showPassword, setShowPassword] = useState(false)

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

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t("password")}
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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t("confirmPassword")}
                    className="dark:bg-gray-700 dark:border-gray-600 pr-10"
                  />
                </div>
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

