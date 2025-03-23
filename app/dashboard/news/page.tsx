"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  language: string
}

export default function NewsPage() {
  const { t, language } = useLanguage()
  const router = useRouter()

  const [searchTitle, setSearchTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  // Mock data - replace with actual API call
  const newsItems: NewsItem[] = [
    { id: "1", title: "News Title 1", category: "general", date: "2023-01-01", language: "uz_latn" },
    { id: "2", title: "News Title 2", category: "events", date: "2023-01-02", language: "uz_latn" },
    { id: "3", title: "Новость 3", category: "announcements", date: "2023-01-03", language: "ru" },
    { id: "4", title: "Янгилик 4", category: "press", date: "2023-01-04", language: "uz_cyrl" },
  ]

  const filteredNews = newsItems.filter((item) => {
    const matchesTitle = item.title.toLowerCase().includes(searchTitle.toLowerCase())
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true
    const matchesLanguage = selectedLanguage ? item.language === selectedLanguage : true
    return matchesTitle && matchesCategory && matchesLanguage
  })

  const handleEdit = (id: string) => {
    router.push(`/dashboard/news/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log("Delete news with ID:", id)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("news")}</h1>
        <Button onClick={() => router.push("/dashboard/news/add")}>
          <Plus className="mr-2 h-4 w-4" /> {t("add")}
        </Button>
      </div>

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
                  <SelectItem value="all">{t("allCategories")}</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="announcements">Announcements</SelectItem>
                  <SelectItem value="press">Press Releases</SelectItem>
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

      <Card>
        <CardContent className="p-0">
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
        </CardContent>
      </Card>
    </div>
  )
}

