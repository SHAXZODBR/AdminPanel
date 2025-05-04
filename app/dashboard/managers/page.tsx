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
import Image from "next/image"
import { AlertCircle, Pencil, Plus, Loader2 } from "lucide-react"
import { useStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ManagersPage() {
  const { language, t } = useLanguage()
  const { leaders, deleteLeader } = useStore()
  const [nameFilter, setNameFilter] = useState("")
  const [positionFilter, setPositionFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentLeaders, setCurrentLeaders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingMockData, setIsUsingMockData] = useState(false)
  const { toast } = useToast()
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [availableLanguages, setAvailableLanguages] = useState(["uz", "ru", "en", "uz-cyrl"])

  // Ensure HTTPS is used for all API requests
  const BASE_URL = "https://uzfk.uz"

  // Fix the loadLeadership function to properly map fields
  const loadLeadership = async (lang: string) => {
    setIsLoading(true)
    try {
      // Make a direct fetch request to the API
      const response = await fetch(`${BASE_URL}/${lang}/api/leadership/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log(`API Response (Leadership - ${lang}):`, data)

      // Get the results array from the response
      const leadershipData = Array.isArray(data) ? data : data.results || []
      setIsUsingMockData(false)

      // Transform API data to match the expected format with better field mapping
      const formattedLeadership = leadershipData.map((leader: any) => ({
        id: leader.id?.toString() || Math.random().toString(36).substring(2, 9),
        language: leader.language || lang,
        fullName: leader.f_name || leader.full_name || leader.fullName || leader.title || "Leader " + (leader.id || ""),
        position: leader.position_text || leader.position || leader.title || "Position",
        phoneNumber: leader.phone || leader.phone_number || "+998 XX XXX XX XX",
        email: leader.email || "email@example.com",
        bio: leader.biography_text || leader.description || leader.bio || "No biography available",
        photo: leader.image || leader.photo || "/placeholder.svg?height=100&width=100",
      }))

      setCurrentLeaders(formattedLeadership)
    } catch (error) {
      console.error(`Error loading leadership data for language ${lang}:`, error)
      toast({
        title: t("error"),
        description: t("errorLoadingLeadership"),
        variant: "destructive",
      })

      // Use mock data as fallback
      setIsUsingMockData(true)
      const mockLeadership = [
        {
          id: "1",
          language: lang,
          fullName: "John Doe",
          position: "CEO",
          phoneNumber: "+998 90 123 45 67",
          email: "john.doe@example.com",
          bio: "Experienced leader with over 15 years in the industry",
          photo: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "2",
          language: lang,
          fullName: "Jane Smith",
          position: "CTO",
          phoneNumber: "+998 90 987 65 43",
          email: "jane.smith@example.com",
          bio: "Technical expert with a background in software development",
          photo: "/placeholder.svg?height=100&width=100",
        },
      ]
      setCurrentLeaders(mockLeadership)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLeadership(selectedLanguage)
  }, [selectedLanguage, toast, t])

  const handleDeleteLeader = async (id: string) => {
    try {
      // Make a direct fetch request to delete the leader
      const response = await fetch(`${BASE_URL}/${selectedLanguage}/api/leadership/${id}/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Add auth token if available
          ...(typeof window !== "undefined" && localStorage.getItem("authToken")
            ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            : {}),
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      // Update the local state after deletion
      setCurrentLeaders((prev) => prev.filter((leader) => leader.id !== id))

      toast({
        title: t("success"),
        description: t("leaderDeleted"),
      })
    } catch (error) {
      console.error("Error deleting leader:", error)
      toast({
        title: t("error"),
        description: t("errorDeletingLeader"),
        variant: "destructive",
      })
    }
  }

  const filteredLeaders = currentLeaders.filter((leader) => {
    const matchesName = leader.fullName.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesPosition =
      positionFilter === "" || leader.position.toLowerCase().includes(positionFilter.toLowerCase())
    return matchesName && matchesPosition
  })

  const handleApplyFilters = () => {
    // Already filtered by the filteredLeaders variable
  }

  const handleClearFilters = () => {
    setNameFilter("")
    setPositionFilter("")
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("managers")}</h2>

        {isUsingMockData && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("mockDataTitle")}</AlertTitle>
            <AlertDescription>{t("mockDataDescription")}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6 rounded-md border filter-section-dark p-4">
          <h3 className="mb-4 text-lg font-medium">{t("filters")}</h3>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                {t("fullName")}
              </label>
              <Input
                id="name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder={t("fullName")}
                className="bg-[#3f4b5b] border-[#374151] text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="position" className="mb-1 block text-sm font-medium">
                {t("position")}
              </label>
              <Input
                id="position"
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                placeholder={t("position")}
                className="bg-[#3f4b5b] border-[#374151] text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label htmlFor="language" className="mb-1 block text-sm font-medium">
                {t("language")}
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="bg-[#3f4b5b] border-[#374151] text-white">
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </SelectItem>
                  ))}
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
          <h3 className="text-xl font-medium">{t("managers")}</h3>
          <Button className="button-primary" asChild>
            <Link href="/dashboard/managers/add">
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
                <TableHead className="text-white">{t("fullName")}</TableHead>
                <TableHead className="text-white">{t("position")}</TableHead>
                <TableHead className="text-white">{t("phoneNumber")}</TableHead>
                <TableHead className="text-white">{t("email")}</TableHead>
                <TableHead className="text-white">{t("bio")}</TableHead>
                <TableHead className="text-white">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      <span className="ml-2">{t("loading")}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredLeaders.length > 0 ? (
                filteredLeaders.slice(0, Number.parseInt(rowsPerPage)).map((leader) => (
                  <TableRow key={leader.id} className="border-gray-200 dark:border-gray-700">
                    <TableCell className="uppercase">{leader.language}</TableCell>
                    <TableCell>
                      <Image
                        src={leader.photo || "/placeholder.svg?height=100&width=100"}
                        alt={leader.fullName}
                        width={60}
                        height={60}
                        className="rounded-full border"
                      />
                    </TableCell>
                    <TableCell>{leader.fullName}</TableCell>
                    <TableCell>{leader.position}</TableCell>
                    <TableCell className="whitespace-nowrap">{leader.phoneNumber}</TableCell>
                    <TableCell>{leader.email}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      <div className="tooltip" title={leader.bio}>
                        {leader.bio}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Link href={`/dashboard/managers/${leader.id}/edit`}>
                            <Pencil className="h-4 w-4 text-amber-500" />
                          </Link>
                        </Button>
                        <DeleteDialog itemName={leader.fullName} onDelete={() => handleDeleteLeader(leader.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    {t("noManagersFound")}
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
