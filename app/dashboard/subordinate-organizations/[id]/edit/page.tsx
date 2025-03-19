// Create the edit page for subordinate organizations
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

export default function EditSubordinateOrganizationPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { subordinateOrganizations, updateSubordinateOrganization } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    name: "",
    type: "organization",
    head: "",
    phoneNumber: "",
    email: "",
    address: "",
  })

  useEffect(() => {
    const orgId = params.id as string

    // Find the organization in all language collections
    let foundOrg = null
    let foundLanguage = ""

    for (const lang of ["en", "ru", "uz"]) {
      const org = subordinateOrganizations[lang]?.find((o) => o.id === orgId)
      if (org) {
        foundOrg = org
        foundLanguage = lang
        break
      }
    }

    if (foundOrg) {
      setFormData({
        language: foundOrg.language,
        name: foundOrg.name,
        type: foundOrg.type,
        head: foundOrg.head,
        phoneNumber: foundOrg.phoneNumber,
        email: foundOrg.email,
        address: foundOrg.address,
      })
    } else {
      toast({
        title: "Error",
        description: "Subordinate organization not found",
        variant: "destructive",
      })
      router.push("/dashboard/subordinate-organizations")
    }
  }, [params.id, subordinateOrganizations, router, toast])

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

    const orgId = params.id as string

    try {
      // Update organization in store with the specific language
      updateSubordinateOrganization(orgId, formData.language as "en" | "ru" | "uz", {
        name: formData.name,
        type: formData.type as "organization" | "institution",
        head: formData.head,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        language: formData.language as "en" | "ru" | "uz", // Ensure language is updated
      })

      toast({
        title: "Success",
        description: "Subordinate organization has been updated successfully",
      })

      // Navigate back to the subordinate organizations page
      router.push("/dashboard/subordinate-organizations")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subordinate organization",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("editSubordinateOrganization")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("editSubordinateOrganization")}</CardTitle>
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
                    <SelectItem value="organization">{t("organization")}</SelectItem>
                    <SelectItem value="institution">{t("institution")}</SelectItem>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("address")}</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={t("address")}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/subordinate-organizations")}
                >
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

