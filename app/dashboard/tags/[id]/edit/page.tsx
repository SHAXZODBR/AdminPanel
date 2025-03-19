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

export default function EditTagPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { tags, updateTag } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    name: "",
    nameTranslit: "",
    alias: "",
  })

  useEffect(() => {
    const tagId = params.id as string

    // Find the tag in all language collections
    let foundTag = null
    let foundLanguage = ""

    for (const lang of ["en", "ru", "uz"]) {
      const tag = tags[lang].find((t) => t.id === tagId)
      if (tag) {
        foundTag = tag
        foundLanguage = lang
        break
      }
    }

    if (foundTag) {
      setFormData({
        language: foundTag.language,
        name: foundTag.name,
        nameTranslit: "",
        alias: foundTag.alias,
      })
    } else {
      toast({
        title: "Error",
        description: "Tag not found",
        variant: "destructive",
      })
      router.push("/dashboard/tags")
    }
  }, [params.id, tags, router, toast])

  // Update the handleSubmit function to ensure proper language handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.alias) {
      toast({
        title: "Error",
        description: "Name and alias are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const tagId = params.id as string

    try {
      // Update tag in store with the specific language
      updateTag(tagId, formData.language as "en" | "ru" | "uz", {
        name: formData.name,
        alias: formData.alias,
        language: formData.language as "en" | "ru" | "uz", // Ensure language is updated
      })

      toast({
        title: "Success",
        description: "Tag has been updated successfully",
      })

      // Navigate back to the tags page
      router.push("/dashboard/tags")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tag",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("editTag")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("editTag")}</CardTitle>
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
                <label className="text-sm font-medium">{t("nameTranslit")}</label>
                <Input
                  value={formData.nameTranslit}
                  onChange={(e) => setFormData({ ...formData, nameTranslit: e.target.value })}
                  placeholder={t("nameTranslit")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("alias")}</label>
                <Input
                  value={formData.alias}
                  onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                  placeholder={t("alias")}
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/tags")}>
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

