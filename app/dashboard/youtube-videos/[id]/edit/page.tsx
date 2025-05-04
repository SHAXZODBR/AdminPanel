"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function EditYouTubeVideoPage() {
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    title: "",
    videoId: "",
    category: "",
    isActive: true,
  })

  useEffect(() => {
    const videoId = params.id as string

    const fetchVideo = async () => {
      try {
        // Use the mock YouTube videos service
        const video = await api.admin.youtube.getById(videoId, language)

        if (video) {
          setFormData({
            language: video.language || language,
            title: video.title || "",
            videoId: video.videoId || "",
            category: video.category || "",
            isActive: video.isActive !== undefined ? video.isActive : true,
          })

          // Set the language in the language provider to match the item's language
          if (video.language) {
            setLanguage(video.language as "uz-cyrl" | "ru" | "uz")
          }
        } else {
          toast({
            title: t("error"),
            description: t("youtubeVideoNotFound"),
            variant: "destructive",
          })
          router.push("/dashboard/youtube-videos")
        }
      } catch (error) {
        console.error(`Error fetching YouTube video ${videoId}:`, error)
        toast({
          title: t("error"),
          description: t("errorLoadingYouTubeVideo"),
          variant: "destructive",
        })
        router.push("/dashboard/youtube-videos")
      }
    }

    fetchVideo()
  }, [params.id, router, toast, setLanguage, language, t])

  const extractVideoId = (url: string) => {
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    const videoId = extractVideoId(url)

    if (videoId) {
      setFormData({ ...formData, videoId })
    } else {
      setFormData({ ...formData, videoId: url }) // Store as is if not a valid YouTube URL
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.videoId) {
      toast({
        title: "Error",
        description: "Title and YouTube video ID/URL are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Update the YouTube video using the mock service
      await api.admin.youtube.update(params.id as string, language, {
        language: formData.language as "en" | "ru" | "uz" | "uz-cyrl",
        title: formData.title,
        videoId: formData.videoId,
        category: formData.category,
        isActive: formData.isActive,
      })

      toast({
        title: "Success",
        description: "YouTube video has been updated successfully",
      })

      // Navigate back to the YouTube videos page
      router.push("/dashboard/youtube-videos")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update YouTube video",
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
          <h2 className="text-2xl font-bold">{t("editYouTubeVideo")}</h2>
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
            <CardTitle className="text-white">{t("editYouTubeVideo")}</CardTitle>
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
                <label className="text-sm font-medium">{t("title")}</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t("title")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("youtubeVideoId")}</label>
                <Input
                  value={formData.videoId}
                  onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                  placeholder="dQw4w9WgXcQ"
                  required
                />
                <p className="text-xs text-gray-500">{t("youtubeVideoIdHelp")}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("preview")}</label>
                <div className="relative h-32 w-56 overflow-hidden rounded border">
                  <img
                    src={`https://img.youtube.com/vi/${formData.videoId}/mqdefault.jpg`}
                    alt="Video preview"
                    className="object-cover w-full h-full"
                  />
                  <a
                    href={`https://www.youtube.com/watch?v=${formData.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-all"
                  >
                    <div className="text-white opacity-0 hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("category")}</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder={t("category")}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is-active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <label htmlFor="is-active" className="text-sm font-medium">
                  {t("active")}
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/youtube-videos")}>
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
