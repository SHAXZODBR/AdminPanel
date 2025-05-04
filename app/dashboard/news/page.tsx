"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiService } from "@/lib/api-service"

interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  language: string
  content: string
  images?: string[]
  raw?: any // For debugging
}

export default function NewsPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const { news, deleteNews } = useStore()

  const [searchTitle, setSearchTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  // Load news from API
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true)
      setApiError(null)

      try {
        // Use the API service to fetch news
        const data = await apiService.content.getAll(language)
        console.log("API response received:", data)

        // Store the raw API response for debugging
        setApiResponse(data)

        const newsData = Array.isArray(data) ? data : data.results || []

        if (newsData.length === 0) {
          console.warn("API returned empty results array")
          setApiError("API returned empty results")
        }

        // Transform API data to match the expected format
        const formattedNews = newsData.map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(36).substring(2, 9),
          title: item.title || "Unknown",
          category: item.type || "general",
          date: item.created_at ? new Date(item.created_at).toLocaleDateString() : "Unknown",
          language: language, // Use UI language for display
          content: item.body || item.content || "",
          images: item.image ? [`https://uzfk.uz${item.image}`] : [],
          raw: item, // Store raw item for debugging
        }))

        setNewsItems(formattedNews)
      } catch (error) {
        console.error("Error fetching news:", error)

        // Provide more specific error message
        let errorMessage = t("errorFetchingNews")
        if (error instanceof Error) {
          errorMessage += `: ${error.message}`
        }
        setApiError(errorMessage)

        toast({
          title: t("error"),
          description: errorMessage,
          variant: "destructive",
        })

        // Set empty array to avoid showing loading indefinitely
        setNewsItems([])
      } finally {
        setIsLoading(false)
      }
    }

    loadNews()
  }, [language, toast, t])

  const filteredNews = newsItems.filter((item) => {
    const matchesTitle = item.title?.toLowerCase().includes(searchTitle.toLowerCase()) || false
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true
    const matchesLanguage = selectedLanguage !== "all" ? item.language === selectedLanguage : true
    return matchesTitle && matchesCategory && matchesLanguage
  })

  const handleEdit = (id: string) => {
    router.push(`/dashboard/news/${id}/edit`)
  }

  const handleDelete = async (id: string) => {
    try {
      // Use the API service to delete the news item
      await apiService.content.delete(id, language)

      // Update the UI immediately by removing the deleted item
      setNewsItems((prev) => prev.filter((item) => item.id !== id))

      toast({
        title: t("success"),
        description: t("newsDeletedSuccessfully"),
      })
    } catch (error) {
      console.error("Error deleting news:", error)
      toast({
        title: t("error"),
        description: t("errorDeletingNews"),
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("news")}</h1>
          <Button onClick={() => router.push("/dashboard/news/add")}>
            <Plus className="mr-2 h-4 w-4" /> {t("add")}
          </Button>
        </div>

        {apiError && (
          <Card className="mb-6 border-red-500">
            <CardContent className="p-4">
              <div className="flex items-center text-red-500">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{apiError}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("filters")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("title")}</label>
                <Input
                  placeholder={t("searchByTitle")}
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t("category")}</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("allCategories")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                    <SelectItem value="Янгиликлар">Янгиликлар</SelectItem>
                    <SelectItem value="Эълонлар">Эълонлар</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t("language")}</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("allLanguages")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allLanguages")}</SelectItem>
                    <SelectItem value="uz_latn">O'zbekcha (Lotin)</SelectItem>
                    <SelectItem value="uz_cyrl">Ўзбекча (Кирилл)</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Debug Information */}
        {apiResponse && (
          <Card className="mb-6 bg-gray-50">
            <CardHeader>
              <CardTitle>API Response Debug</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-xs overflow-auto max-h-40">
                <p>Count: {apiResponse.count}</p>
                <p>Next: {apiResponse.next}</p>
                <p>Previous: {apiResponse.previous}</p>
                <p>Results: {apiResponse.results ? apiResponse.results.length : 0} items</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <p>{t("loading")}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("title")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("language")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.length > 0 ? (
                    filteredNews.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          {item.language === "uz_latn" && "O'zbekcha (Lotin)"}
                          {item.language === "uz_cyrl" && "Ўзбекча (Кирилл)"}
                          {item.language === "ru" && "Русский"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        {t("noNewsFound")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
