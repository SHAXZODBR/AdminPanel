"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "@/components/image-upload"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { addNews as apiAddNews } from "@/lib/api-service"
import { ArrowLeft } from "lucide-react"

export default function AddNewsPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [newsLanguage, setNewsLanguage] = useState<string>(language)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImagesSelected = (files: File[]) => {
    setImages(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !category) {
      toast({
        title: t("error"),
        description: t("pleaseCompleteAllRequiredFields"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create a new news item with the form data
      const newNews = {
        id: Date.now().toString(),
        title,
        content,
        category,
        date: new Date().toISOString().split("T")[0],
        language: newsLanguage,
        images: images.map((file) => URL.createObjectURL(file)),
      }

      // Add the news using the API service
      await apiAddNews(newNews)

      toast({
        title: t("success"),
        description: t("newsAddedSuccessfully"),
      })

      // Redirect back to the news list after saving
      router.push("/dashboard/news")
    } catch (error) {
      console.error("Error adding news:", error)
      toast({
        title: t("error"),
        description: t("errorAddingNews"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/news")} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {t("add")} {t("news")}
            </h1>
          </div>
          <Button variant="outline" onClick={() => router.push("/dashboard/news")}>
            {t("cancel")}
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("selectNewsLanguage")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={newsLanguage} onValueChange={setNewsLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uz_latn">O'zbekcha (Lotin)</SelectItem>
                  <SelectItem value="uz_cyrl">Ўзбекча (Кирилл)</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("title")} required />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("content")}</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                initialContent={content}
                onChange={setContent}
                placeholder={t("content")}
                showTransliteration={newsLanguage.startsWith("uz_")}
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("category")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="announcements">Announcements</SelectItem>
                  <SelectItem value="press">Press Releases</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("uploadImages")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload onImagesSelected={handleImagesSelected} multiple={true} />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/news")}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("saving") : t("save")}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
