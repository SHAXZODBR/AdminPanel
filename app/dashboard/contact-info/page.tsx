"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteDialog } from "@/components/delete-dialog"
import Link from "next/link"
import { Pencil, Plus } from "lucide-react"

// Define the ContactInfo type
type ContactInfo = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  type: "reception" | "trustPhone" | "email" | "address"
  value: string
  description?: string
  createdAt: string
}

export default function ContactInfoPage() {
  const { language, t, setLanguage } = useLanguage()

  // Mock data for contact info
  const mockContactInfo: Record<string, ContactInfo[]> = {
    "uz-cyrl": [
      {
        id: "1",
        language: "uz-cyrl",
        type: "reception",
        value: "+998 71 123 45 67",
        description: "Қабулхона телефон рақами",
        createdAt: "13.03.2025 11:00",
      },
      {
        id: "2",
        language: "uz-cyrl",
        type: "trustPhone",
        value: "+998 71 987 65 43",
        description: "Ишонч телефони",
        createdAt: "12.03.2025 11:14",
      },
      {
        id: "3",
        language: "uz-cyrl",
        type: "email",
        value: "info@example.uz",
        description: "Расмий электрон почта",
        createdAt: "11.03.2025 18:09",
      },
      {
        id: "4",
        language: "uz-cyrl",
        type: "address",
        value: "Тошкент шаҳри, Шайхонтоҳур тумани, Навоий кўчаси, 30-уй",
        description: "Бош офис манзили",
        createdAt: "10.03.2025 14:30",
      },
    ],
    ru: [
      {
        id: "1",
        language: "ru",
        type: "reception",
        value: "+998 71 123 45 67",
        description: "Телефон приемной",
        createdAt: "13.03.2025 11:00",
      },
      {
        id: "2",
        language: "ru",
        type: "trustPhone",
        value: "+998 71 987 65 43",
        description: "Телефон доверия",
        createdAt: "12.03.2025 11:14",
      },
      {
        id: "3",
        language: "ru",
        type: "email",
        value: "info@example.uz",
        description: "Официальная электронная почта",
        createdAt: "11.03.2025 18:09",
      },
      {
        id: "4",
        language: "ru",
        type: "address",
        value: "г. Ташкент, Шайхантаурский район, ул. Навои, дом 30",
        description: "Адрес главного офиса",
        createdAt: "10.03.2025 14:30",
      },
    ],
    uz: [
      {
        id: "1",
        language: "uz",
        type: "reception",
        value: "+998 71 123 45 67",
        description: "Qabulxona telefon raqami",
        createdAt: "13.03.2025 11:00",
      },
      {
        id: "2",
        language: "uz",
        type: "trustPhone",
        value: "+998 71 987 65 43",
        description: "Ishonch telefoni",
        createdAt: "12.03.2025 11:14",
      },
      {
        id: "3",
        language: "uz",
        type: "email",
        value: "info@example.uz",
        description: "Rasmiy elektron pochta",
        createdAt: "11.03.2025 18:09",
      },
      {
        id: "4",
        language: "uz",
        type: "address",
        value: "Toshkent shahri, Shayxontohur tumani, Navoiy ko'chasi, 30-uy",
        description: "Bosh ofis manzili",
        createdAt: "10.03.2025 14:30",
      },
    ],
  }

  const [contactInfoByLanguage, setContactInfoByLanguage] = useState<Record<string, ContactInfo[]>>(mockContactInfo)
  const [typeFilter, setTypeFilter] = useState("")
  const [valueFilter, setValueFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")

  const currentContactInfo = contactInfoByLanguage[language] || []

  const filteredContactInfo = currentContactInfo.filter((info) => {
    const matchesType = typeFilter === "all" || typeFilter === "" || info.type === typeFilter
    const matchesValue = valueFilter === "" || info.value.toLowerCase().includes(valueFilter.toLowerCase())
    return matchesType && matchesValue
  })

  const handleApplyFilters = () => {
    // Already filtered by the filteredContactInfo variable
  }

  const handleClearFilters = () => {
    setTypeFilter("")
    setValueFilter("")
  }

  const handleDelete = (id: string) => {
    setContactInfoByLanguage((prev) => {
      const newState = { ...prev }
      newState[language] = newState[language].filter((item) => item.id !== id)
      return newState
    })
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "reception":
        return t("reception")
      case "trustPhone":
        return t("trustPhone")
      case "email":
        return t("email")
      case "address":
        return t("address")
      default:
        return type
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t("contactInfo")}</h2>
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
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="type" className="mb-1 block text-sm font-medium">
                {t("type")}
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-[#3f4b5b] border-[#374151] text-white">
                  <SelectValue placeholder={t("selectType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="reception">{t("reception")}</SelectItem>
                  <SelectItem value="trustPhone">{t("trustPhone")}</SelectItem>
                  <SelectItem value="email">{t("email")}</SelectItem>
                  <SelectItem value="address">{t("address")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="value" className="mb-1 block text-sm font-medium">
                {t("value")}
              </label>
              <Input
                id="value"
                value={valueFilter}
                onChange={(e) => setValueFilter(e.target.value)}
                placeholder={t("value")}
                className="bg-[#3f4b5b] border-[#374151] text-white placeholder:text-gray-400"
              />
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
          <h3 className="text-xl font-medium">{t("contactInfo")}</h3>
          <Button className="button-primary" asChild>
            <Link href="/dashboard/contact-info/add">
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
                <TableHead className="text-white">{t("type")}</TableHead>
                <TableHead className="text-white">{t("value")}</TableHead>
                <TableHead className="text-white">{t("description")}</TableHead>
                <TableHead className="text-white">{t("created")}</TableHead>
                <TableHead className="text-white">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContactInfo.slice(0, Number.parseInt(rowsPerPage)).map((info) => (
                <TableRow key={info.id} className="border-gray-200 dark:border-gray-700">
                  <TableCell className="uppercase">{info.language}</TableCell>
                  <TableCell>{getTypeLabel(info.type)}</TableCell>
                  <TableCell>{info.value}</TableCell>
                  <TableCell>{info.description}</TableCell>
                  <TableCell>{info.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link href={`/dashboard/contact-info/${info.id}/edit`}>
                          <Pencil className="h-4 w-4 text-amber-500" />
                        </Link>
                      </Button>
                      <DeleteDialog itemName={info.value} onDelete={() => handleDelete(info.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredContactInfo.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No contact information found.
                  </TableCell>
                </TableRow>
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
    </DashboardLayout>
  )
}

