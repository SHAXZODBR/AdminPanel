"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "@/components/image-upload"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

export default function EditNewsPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const newsId = params.id as string

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [initialImages, setInitialImages] = useState<string[]>([])
  const [newsLanguage, setNewsLanguage] = useState<string>(language)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load the news item from the API
    const loadNewsItem = async () => {
      try {
        setIsLoading(true)
        const apiLanguage = language === "ru" ? "uz" : language
        const apiUrl = `https://uzfk.uz/${apiLanguage}/api/content/${newsId}/`

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const newsItem = await response.json()

        if (newsItem) {
          setTitle(newsItem.title || "")
          setContent(newsItem.body || newsItem.content || "")
          setCategory(newsItem.type || newsItem.category || "")
          setNewsLanguage(newsItem.language || language)
          if (newsItem.image) {
            setInitialImages([`https://uzfk.uz${newsItem.image}`])
          } else if (newsItem.images && newsItem.images.length > 0) {
            setInitialImages(
              newsItem.images.map((img: string) => (img.startsWith("http") ? img : `https://uzfk.uz${img}`)),
            )
          }
        } else {
          toast({
            title: t("error"),
            description: t("newsNotFound"),
            variant: "destructive",
          })
          router.push("/dashboard/news")
        }
      } catch (error) {
        console.error("Error loading news item:", error)
        toast({
          title: t("error"),
          description: t("errorLoadingNews"),
          variant: "destructive",
        })
        router.push("/dashboard/news")
      } finally {
        setIsLoading(false)
      }
    }

    loadNewsItem()
  }, [newsId, router, toast, t, language])

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
      // Prepare updated news data
      const updatedNews = {
        title,
        body: content,
        type: category,
        language: newsLanguage,
        // Handle images appropriately based on your API requirements
        image: initialImages.length > 0 ? initialImages[0] : null,
      }

      const apiLanguage = language === "ru" ? "uz" : language
      const apiUrl = `https://uzfk.uz/${apiLanguage}/api/content/${newsId}/`

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(typeof window !== "undefined" && localStorage.getItem("authToken")
            ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            : {}),
        },
        body: JSON.stringify(updatedNews),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      toast({
        title: t("success"),
        description: t("newsUpdatedSuccessfully"),
      })

      // Redirect back to the news list
      router.push("/dashboard/news")
    } catch (error) {
      console.error("Error updating news:", error)
      toast({
        title: t("error"),
        description: t("errorUpdatingNews"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6">
          <div className="flex justify-center items-center h-64">
            <p>{t("loading")}</p>
          </div>
        </div>
      </DashboardLayout>
    )
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
              {t("edit")} {t("news")}
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
              <ImageUpload onImagesSelected={handleImagesSelected} initialImages={initialImages} multiple={true} />
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
