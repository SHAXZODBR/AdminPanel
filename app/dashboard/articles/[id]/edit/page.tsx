"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paperclip } from "lucide-react"

export default function EditArticlePage() {
  const { t, language: currentLanguage } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { articles, updateArticle } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    poster: null as File | null,
    additionalImages: [] as File[],
    author: "",
    newsType: "",
    category: "",
    title: "",
    content: "",
    tags: [] as string[],
    publishDate: "",
    audio: null as File | null,
  })

  useEffect(() => {
    const articleId = params.id as string

    // Find the article in all language collections
    let foundArticle = null
    let foundLanguage = ""

    for (const lang of ["en", "ru", "uz"]) {
      const article = articles[lang]?.find((a) => a.id === articleId)
      if (article) {
        foundArticle = article
        foundLanguage = lang
        break
      }
    }

    if (foundArticle) {
      setFormData({
        ...formData,
        language: foundArticle.language,
        author: foundArticle.author,
        newsType: foundArticle.category,
        category: foundArticle.category,
        title: foundArticle.title,
        content: foundArticle.content || "",
      })
    } else {
      toast({
        title: "Error",
        description: "News not found",
        variant: "destructive",
      })
      router.push("/dashboard/articles")
    }
  }, [params.id, articles, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.newsType) {
      toast({
        title: "Error",
        description: "Title and news type are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const articleId = params.id as string

    try {
      // Update article in store with the specific language
      updateArticle(articleId, formData.language as "en" | "ru" | "uz", {
        title: formData.title,
        category: formData.newsType,
        author: formData.author,
        content: formData.content,
        language: formData.language as "en" | "ru" | "uz", // Ensure language is updated
      })

      toast({
        title: "Success",
        description: "News has been updated successfully",
      })

      // Navigate back to the articles page
      router.push("/dashboard/articles")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update news",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "poster" | "audio") => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, [field]: file })
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("editArticle")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("editArticle")}</CardTitle>
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
                <label className="text-sm font-medium">{t("poster")}</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "poster")}
                    className="hidden"
                    id="poster"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("poster")?.click()}>
                    <Paperclip className="mr-2 h-4 w-4" />
                    {t("uploadPoster")}
                  </Button>
                  {formData.poster && <span className="text-sm">{formData.poster.name}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("newsType")}</label>
                <Select
                  value={formData.newsType}
                  onValueChange={(value) => setFormData({ ...formData, newsType: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectNewsType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Янгиликлар">Янгиликлар</SelectItem>
                    <SelectItem value="Эълонлар">Эълонлар</SelectItem>
                    <SelectItem value="Баннер">Баннер</SelectItem>
                    <SelectItem value="Биз ҳақимизда">Биз ҳақимизда</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("title")}</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t("title")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("content")}</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={t("content")}
                  rows={10}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("audio")}</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e, "audio")}
                    className="hidden"
                    id="audio"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("audio")?.click()}>
                    <Paperclip className="mr-2 h-4 w-4" />
                    {t("uploadAudio")}
                  </Button>
                  {formData.audio && <span className="text-sm">{formData.audio.name}</span>}
                </div>
              </div>

              <div className="flex justify-end">
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

