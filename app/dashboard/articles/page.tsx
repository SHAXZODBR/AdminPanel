"use client"

import { TableCell } from "@/components/ui/table"
import { TableBody } from "@/components/ui/table"
import { TableHead } from "@/components/ui/table"
import { TableRow } from "@/components/ui/table"
import { TableHeader } from "@/components/ui/table"
import { Table } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteDialog } from "@/components/delete-dialog"
import Image from "next/image"
import Link from "next/link"
import { Pencil, Plus } from "lucide-react"
import { useStore } from "@/lib/store"

export default function ArticlesPage() {
  const { language, t } = useLanguage()
  const { articles, deleteArticle } = useStore()
  const [nameFilter, setNameFilter] = useState("")
  const [idFilter, setIdFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentArticles, setCurrentArticles] = useState(articles[language] || [])

  useEffect(() => {
    // Make sure we're using the latest articles data
    setCurrentArticles(articles[language] || [])
  }, [language, articles])

  const filteredArticles = currentArticles.filter((article) => {
    const matchesName = article.title.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesId = idFilter === "" || article.id === idFilter
    const matchesType = typeFilter === "all" || typeFilter === "" || article.category === typeFilter
    return matchesName && matchesId && matchesType
  })

  const handleApplyFilters = () => {
    // Already filtered by the filteredArticles variable
  }

  const handleClearFilters = () => {
    setNameFilter("")
    setIdFilter("")
    setTypeFilter("")
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("articles")}</h2>

        <div className="mb-6 rounded-md border filter-section-dark p-4">
          <h3 className="mb-4 text-lg font-medium">{t("filters")}</h3>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                {t("title")}
              </label>
              <Input
                id="name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder={t("title")}
                className="bg-[#3f4b5b] border-[#374151] text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="id" className="mb-1 block text-sm font-medium">
                {t("id")}
              </label>
              <Input
                id="id"
                value={idFilter}
                onChange={(e) => setIdFilter(e.target.value)}
                placeholder="ID"
                className="bg-[#3f4b5b] border-[#374151] text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="type" className="mb-1 block text-sm font-medium">
                {t("newsType")}
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-[#3f4b5b] border-[#374151] text-white">
                  <SelectValue placeholder={t("selectNewsType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Янгиликлар">Янгиликлар</SelectItem>
                  <SelectItem value="Эълонлар">Эълонлар</SelectItem>
                  <SelectItem value="Баннер">Баннер</SelectItem>
                  <SelectItem value="Биз ҳақимизда">Биз ҳақимизда</SelectItem>
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
          <h3 className="text-xl font-medium">{t("articles")}</h3>
          <Button className="button-primary" asChild>
            <Link href="/dashboard/articles/add">
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
                <TableHead className="text-white">{t("image")}</TableHead>
                <TableHead className="text-white">{t("newsType")}</TableHead>
                <TableHead className="text-white">{t("title")}</TableHead>
                <TableHead className="text-white">{t("author")}</TableHead>
                <TableHead className="text-white">{t("views")}</TableHead>
                <TableHead className="text-white">{t("created")}</TableHead>
                <TableHead className="text-white">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.slice(0, Number.parseInt(rowsPerPage)).map((article) => (
                <TableRow key={article.id} className="border-gray-200 dark:border-gray-700">
                  <TableCell className="uppercase">{article.language}</TableCell>
                  <TableCell>
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={80}
                      height={60}
                      className="rounded border"
                    />
                  </TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell>{article.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link href={`/dashboard/articles/${article.id}/edit`}>
                          <Pencil className="h-4 w-4 text-amber-500" />
                        </Link>
                      </Button>
                      <DeleteDialog itemName={article.title} onDelete={() => deleteArticle(article.id, language)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
    </DashboardLayout>
  )
}

