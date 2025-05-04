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
import { Pencil, Plus, Loader2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { apiService } from "@/lib/api-service"

// Define the ContactInfo type
type ContactInfo = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  type: "reception" | "trustPhone" | "email" | "address"
  value: string
  description?: string
  createdAt: string
}

// Fallback data for development/preview purposes
const fallbackData: Record<string, ContactInfo[]> = {
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

export default function ContactInfoPage() {
  const { language, t, setLanguage } = useLanguage()
  const { toast } = useToast()

  const [contactInfoByLanguage, setContactInfoByLanguage] = useState<Record<string, ContactInfo[]>>({})
  const [typeFilter, setTypeFilter] = useState("")
  const [valueFilter, setValueFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleDelete = async (id: string) => {
    try {
      await apiService.contact.delete(id, language)

      setContactInfoByLanguage((prev) => {
        const newState = { ...prev }
        newState[language] = newState[language].filter((item) => item.id !== id)
        return newState
      })

      toast({
        title: "Success",
        description: "Contact information deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting contact info:", error)
      toast({
        title: "Error",
        description: "Failed to delete contact information",
        variant: "destructive",
      })
    }
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

  // Add useEffect to fetch contact info from API
  // Replace environment variable with hardcoded URL
  const BASE_URL = "https://uzfk.uz"

  // Update the fetchContactInfo function
  const fetchContactInfo = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Use the API service to fetch contact info
      const data = await apiService.contact.getAll(language)
      console.log("API response received:", data)

      const contactData = Array.isArray(data) ? data : data.results || []

      // Transform API data to match the expected format
      const formattedContactInfo = contactData.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(36).substring(2, 9),
        language: item.language || language,
        type: mapContactType(item.type || ""),
        value: item.value || item.contact_info || "",
        description: item.description || "",
        createdAt: item.created_at ? formatDate(item.created_at) : new Date().toLocaleString(),
      }))

      setContactInfoByLanguage((prev) => ({
        ...prev,
        [language]: formattedContactInfo,
      }))
    } catch (error) {
      console.error("Error fetching contact info:", error)
      setError("Failed to load contact information. Please try again later.")

      toast({
        title: t("error"),
        description: t("errorFetchingContactInfo"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to map contact types from API to our application types
  const mapContactType = (type: string): "reception" | "trustPhone" | "email" | "address" => {
    const typeMap: Record<string, "reception" | "trustPhone" | "email" | "address"> = {
      reception: "reception",
      trust_phone: "trustPhone",
      email: "email",
      address: "address",
      phone: "reception",
      trust: "trustPhone",
      mail: "email",
      location: "address",
    }

    return typeMap[type.toLowerCase()] || "reception"
  }

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  }

  // Add useEffect to fetch contact info from API
  useEffect(() => {
    fetchContactInfo()
  }, [language, toast, t])

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

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading...
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredContactInfo.slice(0, Number.parseInt(rowsPerPage)).map((info) => (
                  <TableRow key={info.id} className="border-gray-200 dark:border-gray-700">
                    <TableCell className="uppercase">{info.language}</TableCell>
                    <TableCell>{getTypeLabel(info.type)}</TableCell>
                    <TableCell>{info.value}</TableCell>
                    <TableCell>{info.description}</TableCell>
                    <TableCell>{info.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Link href={`/dashboard/contact-info/${info.id}/edit`}>
                            <Pencil className="h-4 w-4 text-amber-500" />
                          </Link>
                        </Button>
                        <DeleteDialog itemName={info.value} onDelete={() => handleDelete(info.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {filteredContactInfo.length === 0 && !isLoading && (
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
