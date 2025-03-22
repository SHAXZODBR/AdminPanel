"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// Mock data for contact info
const mockContactInfo = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      type: "reception",
      value: "+998 71 123 45 67",
      description: "Қабулхона телефон рақами",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz-cyrl",
      type: "trustPhone",
      value: "+998 71 987 65 43",
      description: "Ишонч телефони",
      createdAt: "12.03.2025 11:14",
    },
    {
      id: "3",
      language: "uz-cyrl",
      type: "email",
      value: "info@example.uz",
      description: "Расмий электрон почта",
      createdAt: "11.03.2025 18:09",
    },
    {
      id: "4",
      language: "uz-cyrl",
      type: "address",
      value: "Тошкент шаҳри, Шайхонтоҳур тумани, Навоий кўчаси, 30-уй",
      description: "Бош офис манзили",
      createdAt: "10.03.2025 14:30",
    },
  ],
  ru: [
    {
      id: "1",
      language: "ru",
      type: "reception",
      value: "+998 71 123 45 67",
      description: "Телефон приемной",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "ru",
      type: "trustPhone",
      value: "+998 71 987 65 43",
      description: "Телефон доверия",
      createdAt: "12.03.2025 11:14",
    },
    {
      id: "3",
      language: "ru",
      type: "email",
      value: "info@example.uz",
      description: "Официальная электронная почта",
      createdAt: "11.03.2025 18:09",
    },
    {
      id: "4",
      language: "ru",
      type: "address",
      value: "г. Ташкент, Шайхантаурский район, ул. Навои, дом 30",
      description: "Адрес главного офиса",
      createdAt: "10.03.2025 14:30",
    },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      type: "reception",
      value: "+998 71 123 45 67",
      description: "Qabulxona telefon raqami",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz",
      type: "trustPhone",
      value: "+998 71 987 65 43",
      description: "Ishonch telefoni",
      createdAt: "12.03.2025 11:14",
    },
    {
      id: "3",
      language: "uz",
      type: "email",
      value: "info@example.uz",
      description: "Rasmiy elektron pochta",
      createdAt: "11.03.2025 18:09",
    },
    {
      id: "4",
      language: "uz",
      type: "address",
      value: "Toshkent shahri, Shayxontohur tumani, Navoiy ko'chasi, 30-uy",
      description: "Bosh ofis manzili",
      createdAt: "10.03.2025 14:30",
    },
  ],
}

export default function EditContactInfoPage() {
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    type: "reception",
    value: "",
    description: "",
  })

  useEffect(() => {
    const infoId = params.id as string

    // Find the contact info in all language collections
    let foundInfo = null
    let foundLanguage = ""

    for (const lang of Object.keys(mockContactInfo)) {
      const info = mockContactInfo[lang].find((i) => i.id === infoId)
      if (info) {
        foundInfo = info
        foundLanguage = lang
        break
      }
    }

    if (foundInfo) {
      setFormData({
        language: foundInfo.language,
        type: foundInfo.type,
        value: foundInfo.value,
        description: foundInfo.description || "",
      })

      // Set the language in the language provider to match the item's language
      setLanguage(foundInfo.language as "uz-cyrl" | "ru" | "uz")
    } else {
      toast({
        title: "Error",
        description: "Contact information not found",
        variant: "destructive",
      })
      router.push("/dashboard/contact-info")
    }
  }, [params.id, router, toast, setLanguage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.value) {
      toast({
        title: "Error",
        description: "Value is required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Contact information has been updated successfully",
      })

      // Navigate back to the contact info page
      router.push("/dashboard/contact-info")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t("editContactInfo")}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("language")}:</span>
              <Select
                value={language}
                onValueChange={(value: "uz-cyrl" | "ru" | "uz") => {
                  setLanguage(value)
                  setFormData((prev) => ({ ...prev, language: value }))
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uz-cyrl">Ўзбекча (Кирилл)</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="uz">O'zbekcha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("editContactInfo")}</CardTitle>
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
                    <SelectItem value="uz-cyrl">Ўзбекча (Кирилл)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("type")}</label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reception">{t("reception")}</SelectItem>
                    <SelectItem value="trustPhone">{t("trustPhone")}</SelectItem>
                    <SelectItem value="email">{t("email")}</SelectItem>
                    <SelectItem value="address">{t("address")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("value")}</label>
                <Input
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder={t("value")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("description")}</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t("description")}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/contact-info")}>
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

