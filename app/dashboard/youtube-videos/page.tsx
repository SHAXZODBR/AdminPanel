"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteDialog } from "@/components/delete-dialog"
import Link from "next/link"
import { Pencil, Plus, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

// Define the YouTubeVideo type
type YouTubeVideo = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  title: string
  videoId: string
  category: string
  isActive: boolean
  createdAt: string
}

// Mock API service for YouTube videos
const youtubeVideoService = {
  // Mock data
  mockData: {
    "uz-cyrl": [
      {
        id: "1",
        language: "uz-cyrl",
        title: "Ўзбекистон янгиликлари",
        videoId: "dQw4w9WgXcQ",
        category: "Янгиликлар",
        isActive: true,
        createdAt: "13.03.2025 11:00",
      },
      {
        id: "2",
        language: "uz-cyrl",
        title: "Тошкент шаҳрида янги бинолар",
        videoId: "dQw4w9WgXcQ",
        category: "Шаҳарсозлик",
        isActive: true,
        createdAt: "12.03.2025 11:14",
      },
      {
        id: "3",
        language: "uz-cyrl",
        title: "Ўзбекистон тарихи ҳақида",
        videoId: "dQw4w9WgXcQ",
        category: "Таълим",
        isActive: false,
        createdAt: "11.03.2025 18:09",
      },
    ],
    ru: [
      {
        id: "1",
        language: "ru",
        title: "Новости Узбекистана",
        videoId: "dQw4w9WgXcQ",
        category: "Новости",
        isActive: true,
        createdAt: "13.03.2025 11:00",
      },
      {
        id: "2",
        language: "ru",
        title: "Новые здания в городе Ташкент",
        videoId: "dQw4w9WgXcQ",
        category: "Градостроительство",
        isActive: true,
        createdAt: "12.03.2025 11:14",
      },
      {
        id: "3",
        language: "ru",
        title: "Об истории Узбекистана",
        videoId: "dQw4w9WgXcQ",
        category: "Образование",
        isActive: false,
        createdAt: "11.03.2025 18:09",
      },
    ],
    uz: [
      {
        id: "1",
        language: "uz",
        title: "O'zbekiston yangiliklari",
        videoId: "dQw4w9WgXcQ",
        category: "Yangiliklar",
        isActive: true,
        createdAt: "13.03.2025 11:00",
      },
      {
        id: "2",
        language: "uz",
        title: "Toshkent shahrida yangi binolar",
        videoId: "dQw4w9WgXcQ",
        category: "Shaharsozlik",
        isActive: true,
        createdAt: "12.03.2025 11:14",
      },
      {
        id: "3",
        language: "uz",
        title: "O'zbekiston tarixi haqida",
        videoId: "dQw4w9WgXcQ",
        category: "Ta'lim",
        isActive: false,
        createdAt: "11.03.2025 18:09",
      },
    ],
  },

  // Get all videos by language
  getAll: async (language: string): Promise<YouTubeVideo[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...(youtubeVideoService.mockData[language] || [])]
  },

  // Get video by ID and language
  getById: async (id: string, language: string): Promise<YouTubeVideo | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))
    const item = youtubeVideoService.mockData[language]?.find((item) => item.id === id)
    return item ? { ...item } : null
  },

  // Add new video
  add: async (data: Omit<YouTubeVideo, "id" | "createdAt">): Promise<YouTubeVideo> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newItem: YouTubeVideo = {
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString("ru-RU"),
      ...data,
    }

    if (!youtubeVideoService.mockData[data.language]) {
      youtubeVideoService.mockData[data.language] = []
    }

    youtubeVideoService.mockData[data.language].push(newItem)
    return { ...newItem }
  },

  // Update video
  update: async (id: string, language: string, data: Partial<YouTubeVideo>): Promise<YouTubeVideo> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const videos = youtubeVideoService.mockData[language] || []
    const index = videos.findIndex((item) => item.id === id)
    if (index === -1) throw new Error("Video not found")

    const updatedItem = {
      ...videos[index],
      ...data,
    }

    videos[index] = updatedItem
    return { ...updatedItem }
  },

  // Delete video
  delete: async (id: string, language: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    const videos = youtubeVideoService.mockData[language] || []
    const index = videos.findIndex((item) => item.id === id)
    if (index !== -1) {
      videos.splice(index, 1)
    }
  },
}

export default function YouTubeVideosPage() {
  const { t, language, setLanguage } = useLanguage()
  const { toast } = useToast()

  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [titleFilter, setTitleFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [isLoading, setIsLoading] = useState(true)

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<YouTubeVideo | null>(null)
  const [editFormData, setEditFormData] = useState({
    title: "",
    videoId: "",
    category: "",
    isActive: true,
  })

  // Load data when language changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await youtubeVideoService.getAll(language)
        setVideos(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load YouTube videos",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [language, toast])

  const filteredVideos = videos.filter((video) => {
    const matchesTitle = titleFilter === "" || video.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesCategory = categoryFilter === "" || video.category.toLowerCase().includes(categoryFilter.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      statusFilter === "" ||
      (statusFilter === "active" && video.isActive) ||
      (statusFilter === "inactive" && !video.isActive)
    return matchesTitle && matchesCategory && matchesStatus
  })

  const handleApplyFilters = () => {
    // Already filtered by the filteredVideos variable
  }

  const handleClearFilters = () => {
    setTitleFilter("")
    setCategoryFilter("")
    setStatusFilter("")
  }

  const handleDelete = async (id: string) => {
    try {
      await youtubeVideoService.delete(id, language)
      setVideos((prev) => prev.filter((video) => video.id !== id))
      toast({
        title: "Success",
        description: "YouTube video deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete YouTube video",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (video: YouTubeVideo) => {
    setEditingItem(video)
    setEditFormData({
      title: video.title,
      videoId: video.videoId,
      category: video.category,
      isActive: video.isActive,
    })
    setEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingItem) return

    try {
      const updatedVideo = await youtubeVideoService.update(editingItem.id, language, {
        title: editFormData.title,
        videoId: editFormData.videoId,
        category: editFormData.category,
        isActive: editFormData.isActive,
      })

      // Update the video in the state
      setVideos((prev) => prev.map((video) => (video.id === editingItem.id ? updatedVideo : video)))

      setEditDialogOpen(false)
      toast({
        title: "Success",
        description: "YouTube video updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update YouTube video",
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t("youtubeVideos")}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("language")}:</span>
              <Select value={language} onValueChange={(value: "uz-cyrl" | "ru" | "uz") => setLanguage(value)}>
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

        <div className="mb-6 rounded-md border filter-section-dark p-4">
          <h3 className="mb-4 text-lg font-medium">{t("filters")}</h3>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium">
                {t("title")}
              </label>
              <Input
                id="title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                placeholder={t("title")}
                className="bg-[#3f4b5b] border-[#374151] text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium">
                {t("category")}
              </label>
              <Input
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                placeholder={t("category")}
                className="bg-[#3f4b5b] border-[#374151] text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium">
                {t("status")}
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-[#3f4b5b] border-[#374151] text-white">
                  <SelectValue placeholder={t("selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="active">{t("active")}</SelectItem>
                  <SelectItem value="inactive">{t("inactive")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleApplyFilters} className="button-secondary">
              {t("apply")}
            </Button>
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="border-[#374151] text-white hover:bg-[#3f4b5b]"
            >
              {t("clear")}
            </Button>
          </div>
        </div>

        <div className="mb-4 flex justify-between">
          <h3 className="text-xl font-medium">{t("youtubeVideos")}</h3>
          <Button className="button-primary" asChild>
            <Link href="/dashboard/youtube-videos/add">
              <Plus className="mr-2 h-4 w-4" />
              {t("add")}
            </Link>
          </Button>
        </div>

        <div className="rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700">
          <Table>
            <TableHeader className="table-header-dark">
              <TableRow>
                <TableHead className="text-white">{t("language")}</TableHead>
                <TableHead className="text-white">{t("title")}</TableHead>
                <TableHead className="text-white">{t("preview")}</TableHead>
                <TableHead className="text-white">{t("category")}</TableHead>
                <TableHead className="text-white">{t("status")}</TableHead>
                <TableHead className="text-white">{t("created")}</TableHead>
                <TableHead className="text-white">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredVideos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No YouTube videos found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredVideos.slice(0, Number.parseInt(rowsPerPage)).map((video) => (
                  <TableRow key={video.id} className="border-gray-200 dark:border-gray-700">
                    <TableCell className="uppercase">{video.language}</TableCell>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>
                      <div className="relative h-16 w-28 overflow-hidden rounded border bg-gray-100 flex items-center justify-center group">
                        <img
                          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                          alt={video.title}
                          className="object-cover w-full h-full"
                        />
                        <a
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all"
                        >
                          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>{video.category}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${video.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {video.isActive ? t("active") : t("inactive")}
                      </span>
                    </TableCell>
                    <TableCell>{video.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => handleEdit(video)}
                        >
                          <Pencil className="h-4 w-4 text-amber-500" />
                        </Button>
                        <DeleteDialog itemName={video.title} onDelete={() => handleDelete(video.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end p-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("rowsPerPage")}</span>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("editYouTubeVideo")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("title")}</label>
              <Input
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                placeholder={t("title")}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("youtubeVideoId")}</label>
              <Input
                value={editFormData.videoId}
                onChange={(e) => setEditFormData({ ...editFormData, videoId: e.target.value })}
                placeholder="dQw4w9WgXcQ"
                required
              />
              <p className="text-xs text-gray-500">{t("youtubeVideoIdHelp")}</p>
            </div>

            {editFormData.videoId && (
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("preview")}</label>
                <div className="relative h-32 w-56 overflow-hidden rounded border">
                  <img
                    src={`https://img.youtube.com/vi/${editFormData.videoId}/mqdefault.jpg`}
                    alt="Video preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("category")}</label>
              <Input
                value={editFormData.category}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                placeholder={t("category")}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is-active-edit"
                checked={editFormData.isActive}
                onCheckedChange={(checked) => setEditFormData({ ...editFormData, isActive: checked })}
              />
              <label htmlFor="is-active-edit" className="text-sm font-medium">
                {t("active")}
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleSaveEdit} className="button-primary">
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

