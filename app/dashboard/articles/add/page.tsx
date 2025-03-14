"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paperclip } from "lucide-react"

export default function AddArticlePage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const { addArticle } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    poster: null as File | null,
    additionalImages: [] as File[],
    author: "",
    parentCategory: "",
    category: "",
    title: "",
    content: "",
    tags: [] as string[],
    publishDate: "",
    socialShare: false,
    audio: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.category) {
      toast({
        title: "Error",
        description: "Title and category are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Add article to store
    addArticle({
      language: language as "en" | "ru" | "uz",
      title: formData.title,
      category: formData.category,
      author: formData.author || "Admin",
      image: "/placeholder.svg?height=80&width=120",
      views: 0,
    })

    toast({
      title: "Success",
      description: "Article has been created successfully",
    })

    setIsLoading(false)
    router.push("/dashboard/articles")
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
        <h2 className="mb-6 text-2xl font-bold">{t("addArticle")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("addArticle")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("parentCategory")}</label>
                  <Select
                    value={formData.parentCategory}
                    onValueChange={(value) => setFormData({ ...formData, parentCategory: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectParentCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="life">Мелочи жизни</SelectItem>
                      <SelectItem value="health">Здоровье</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("category")}</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Экономика</SelectItem>
                      <SelectItem value="politics">Политика</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="social-share"
                  checked={formData.socialShare}
                  onCheckedChange={(checked) => setFormData({ ...formData, socialShare: checked })}
                />
                <label htmlFor="social-share" className="text-sm font-medium">
                  {t("socialShare")}
                </label>
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

