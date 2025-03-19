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
  const { t } = useLanguage()
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

  useEffect(() => {
    const departmentId = params.id as string

    // Find the department in all language collections
    let foundDepartment = null
    let foundLanguage = ""

    for (const lang of ["en", "ru", "uz"]) {
      const department = departments[lang]?.find((d) => d.id === departmentId)
      if (department) {
        foundDepartment = department
        foundLanguage = lang
        break
      }
    }

    if (foundDepartment) {
      setFormData({
        language: foundDepartment.language,
        name: foundDepartment.name,
        type: foundDepartment.type,
        head: foundDepartment.head,
        phoneNumber: foundDepartment.phoneNumber,
        email: foundDepartment.email,
      })
    } else {
      toast({
        title: "Error",
        description: "Department not found",
        variant: "destructive",
      })
      router.push("/dashboard/departments")
    }
  }, [params.id, departments, router, toast])

  // Update the handleSubmit function to ensure proper language handling
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
      // Update department in store with the specific language
      updateDepartment(departmentId, formData.language as "en" | "ru" | "uz", {
        name: formData.name,
        type: formData.type as "department" | "sector",
        head: formData.head,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        language: formData.language as "en" | "ru" | "uz", // Ensure language is updated
      })

      toast({
        title: "Success",
        description: "Department has been updated successfully",
      })

      // Navigate back to the departments page
      router.push("/dashboard/departments")
    } catch (error) {
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

