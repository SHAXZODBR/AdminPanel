// Create the add page for subordinate organizations
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

export default function AddSubordinateOrganizationPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const { addSubordinateOrganization } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: language,
    name: "",
    type: "organization",
    head: "",
    phoneNumber: "",
    email: "",
    address: "",
  })

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

    try {
      // Add organization to store
      addSubordinateOrganization({
        language: formData.language as "en" | "ru" | "uz",
        name: formData.name,
        type: formData.type as "organization" | "institution",
        head: formData.head,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
      })

      toast({
        title: "Success",
        description: "Subordinate organization has been added successfully",
      })

      // Navigate back to the subordinate organizations page
      router.push("/dashboard/subordinate-organizations")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add subordinate organization",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("addSubordinateOrganization")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("addSubordinateOrganization")}</CardTitle>
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

