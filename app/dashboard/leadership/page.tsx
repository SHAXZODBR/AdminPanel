"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiService } from "@/lib/api-service"

interface LeadershipMember {
  id: string
  name: string
  position: string
  department: string
  phone: string
  email: string
  image?: string
}

export default function LeadershipPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()

  const [searchName, setSearchName] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [leadershipMembers, setLeadershipMembers] = useState<LeadershipMember[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)

  // Base API URL
  const API_BASE_URL = "https://uzfk.uz"

  // Load leadership data from API
  useEffect(() => {
    const fetchLeadership = async () => {
      setIsLoading(true)
      setApiError(null)

      try {
        // Use the API service to fetch leadership data
        const data = await apiService.leadership.getAll(language)
        console.log("API response received:", data)

        const leadershipData = Array.isArray(data) ? data : data.results || []

        if (leadershipData.length === 0) {
          console.warn("API returned empty results array")
          setApiError("API returned empty results")
        }

        // Extract unique departments for filtering
        const uniqueDepartments = Array.from(
          new Set(leadershipData.map((item: any) => item.department || item.bo_lim || "")),
        ).filter(Boolean)

        setDepartments(uniqueDepartments)

        // Transform API data to match the expected format
        const formattedLeadership = leadershipData.map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(36).substring(2, 9),
          name: item.name || item.ism || "",
          position: item.position || item.lavozim || "",
          department: item.department || item.bo_lim || "",
          phone: item.phone || item.telefon || "",
          email: item.email || "",
          image: item.image ? `https://uzfk.uz${item.image}` : undefined,
        }))

        setLeadershipMembers(formattedLeadership)
      } catch (error) {
        console.error("Error fetching leadership:", error)

        // Provide more specific error message
        let errorMessage = t("errorFetchingLeadership")
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
        setLeadershipMembers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeadership()
  }, [language, toast, t])

  const filteredLeadership = leadershipMembers.filter((item) => {
    const matchesName = item.name?.toLowerCase().includes(searchName.toLowerCase()) || false
    const matchesDepartment = selectedDepartment ? item.department === selectedDepartment : true
    return matchesName && matchesDepartment
  })

  const handleEdit = (id: string) => {
    router.push(`/dashboard/leadership/${id}/edit`)
  }

  const handleDelete = async (id: string) => {
    try {
      // Use the API service to delete the leadership member
      await apiService.leadership.delete(id, language)

      // Remove the deleted member from the state
      setLeadershipMembers((prev) => prev.filter((item) => item.id !== id))

      toast({
        title: t("success"),
        description: t("leadershipDeletedSuccessfully"),
      })
    } catch (error) {
      console.error("Error deleting leadership member:", error)
      toast({
        title: t("error"),
        description: t("errorDeletingLeadership"),
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("leadership")}</h1>
          <Button onClick={() => router.push("/dashboard/leadership/add")}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("name")}</label>
                <Input
                  placeholder={t("searchByName")}
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t("department")}</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("allDepartments")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p>{t("loading")}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("position")}</TableHead>
                    <TableHead>{t("department")}</TableHead>
                    <TableHead>{t("contact")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeadership.length > 0 ? (
                    filteredLeadership.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.position}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>
                          <div>{item.phone}</div>
                          <div className="text-sm text-gray-500">{item.email}</div>
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
                        {t("noLeadershipFound")}
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
