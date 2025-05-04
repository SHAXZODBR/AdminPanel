// Create the edit page for departments
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

export default function EditDepartmentPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { departments, updateDepartment } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    name: "",
    type: "department",
    head: "",
    phoneNumber: "",
    email: "",
  })

  // Update the useEffect to properly fetch department data from the API
  useEffect(() => {
    const departmentId = params.id as string
    const fetchDepartment = async () => {
      try {
        setIsLoading(true)
        const apiLanguage = language === "ru" ? "uz" : language
        const apiUrl = `https://uzfk.uz/${apiLanguage}/api/sector-and-department/${departmentId}/`

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

        const departmentData = await response.json()

        setFormData({
          language: departmentData.language || language,
          name: departmentData.name || "",
          type: departmentData.type || "department",
          head: departmentData.head || "",
          phoneNumber: departmentData.phone_number || "",
          email: departmentData.email || "",
        })
      } catch (error) {
        console.error("Error fetching department:", error)
        toast({
          title: "Error",
          description: "Department not found",
          variant: "destructive",
        })
        router.push("/dashboard/departments")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDepartment()
  }, [params.id, router, toast, language])

  // Update the handleSubmit function to properly update department data via the API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.head) {
      toast({
        title: "Error",
        description: "Name and head are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const departmentId = params.id as string

    try {
      const apiLanguage = formData.language === "ru" ? "uz" : formData.language
      const apiUrl = `https://uzfk.uz/${apiLanguage}/api/sector-and-department/${departmentId}/`

      const departmentData = {
        name: formData.name,
        type: formData.type,
        head: formData.head,
        phone_number: formData.phoneNumber,
        email: formData.email,
        language: formData.language,
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
        body: JSON.stringify(departmentData),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      toast({
        title: "Success",
        description: "Department has been updated successfully",
      })

      // Navigate back to the departments page
      router.push("/dashboard/departments")
    } catch (error) {
      console.error("Error updating department:", error)
      toast({
        title: "Error",
        description: "Failed to update department",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("editDepartment")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("editDepartment")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("language")}</label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский язык</SelectItem>
                    <SelectItem value="uz">O'zbek tili</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("name")}</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("name")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("type")}</label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="department">{t("department")}</SelectItem>
                    <SelectItem value="sector">{t("sector")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("head")}</label>
                <Input
                  value={formData.head}
                  onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                  placeholder={t("head")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("phoneNumber")}</label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("email")}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@example.com"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/departments")}>
                  {t("cancel")}
                </Button>
                <Button type="submit" className="button-primary" disabled={isLoading}>
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
