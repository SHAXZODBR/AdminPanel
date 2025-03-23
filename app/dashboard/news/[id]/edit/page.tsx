"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "@/components/image-upload"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  images: string[]
  language: string
}

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { id } = params

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [initialImages, setInitialImages] = useState<string[]>([])
  const [newsLanguage, setNewsLanguage] = useState<string>(language)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch news data
    // This is a placeholder for the actual API call
    const fetchNewsData = async () => {
      setIsLoading(true)
      try {
        // Mock data - replace with actual API call
        const newsData: NewsItem = {
          id,
          title: "Sample News Title",
          content: "<p>This is sample news content.</p>",
          category: "general",
          images: ["/placeholder.svg?height=300&width=300"],
          language: language,
        }

        setTitle(newsData.title)
        setContent(newsData.content)
        setCategory(newsData.category)
        setInitialImages(newsData.images)
        setNewsLanguage(newsData.language)
      } catch (error) {
        console.error("Error fetching news data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewsData()
  }, [id, language])

  const handleImagesSelected = (files: File[]) => {
    setImages(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically upload the images and update the news data
    // This is a placeholder for the actual implementation

    console.log({
      id,
      title,
      content,
      category,
      images,
      language: newsLanguage,
    })

    // Redirect back to the news list after saving
    router.push("/dashboard/news")
  }

  if (isLoading) {
    return <div className="container mx-auto py-6">Loading...</div>
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        {t("edit")} {t("news")}
      </h1>

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
            <RichTextEditor value={content} onChange={setContent} placeholder={t("content")} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("category")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("category")} />
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
          <Button type="submit">{t("save")}</Button>
        </div>
      </form>
    </div>
  )
}

