// Create the edit page for regional councils
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

export default function EditRegionalCouncilPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { regionalCouncils, updateRegionalCouncil } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    name: "",
    region: "",
    head: "",
    phoneNumber: "",
    email: "",
    address: "",
  })

  useEffect(() => {
    const councilId = params.id as string

    // Find the council in all language collections
    let foundCouncil = null
    let foundLanguage = ""

    for (const lang of ["en", "ru", "uz"]) {
      const council = regionalCouncils[lang]?.find((c) => c.id === councilId)
      if (council) {
        foundCouncil = council
        foundLanguage = lang
        break
      }
    }

    if (foundCouncil) {
      setFormData({
        language: foundCouncil.language,
        name: foundCouncil.name,
        region: foundCouncil.region,
        head: foundCouncil.head,
        phoneNumber: foundCouncil.phoneNumber,
        email: foundCouncil.email,
        address: foundCouncil.address,
      })
    } else {
      toast({
        title: "Error",
        description: "Regional council not found",
        variant: "destructive",
      })
      router.push("/dashboard/regional-councils")
    }
  }, [params.id, regionalCouncils, router, toast])

  // Update the handleSubmit function to ensure proper language handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.region || !formData.head) {
      toast({
        title: "Error",
        description: "Name, region, and head are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const councilId = params.id as string

    try {
      // Update council in store with the specific language
      updateRegionalCouncil(councilId, formData.language as "en" | "ru" | "uz", {
        name: formData.name,
        region: formData.region,
        head: formData.head,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        language: formData.language as "en" | "ru" | "uz", // Ensure language is updated
      })

      toast({
        title: "Success",
        description: "Regional council has been updated successfully",
      })

      // Navigate back to the regional councils page
      router.push("/dashboard/regional-councils")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update regional council",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("editRegionalCouncil")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("editRegionalCouncil")}</CardTitle>
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
                <label className="text-sm font-medium">{t("region")}</label>
                <Input
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder={t("region")}
                  required
                />
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
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/regional-councils")}>
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

