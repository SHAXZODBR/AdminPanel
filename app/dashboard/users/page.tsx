"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteDialog } from "@/components/delete-dialog"
import { Pencil, Plus, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"
import { apiService } from "@/lib/api-service"

export default function UsersPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [loginFilter, setLoginFilter] = useState("")
  const [idFilter, setIdFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [availableLanguages, setAvailableLanguages] = useState(["uz", "ru", "en", "uz-cyrl"])
  const store = useStore()

  // Ensure HTTPS is used for all API requests
  const BASE_URL = "https://uzfk.uz"

  // Update the fetchUsers function to properly handle API responses and refresh data
  const fetchUsers = async (lang: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Make a direct fetch request to the API
      const apiLanguage = lang === "ru" ? "uz" : lang
      const response = await fetch(`https://uzfk.uz/${apiLanguage}/api/users/`, {
        method: "GET",
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

      const data = await response.json()
      console.log("API Response:", data)

      // Handle different response formats
      const userData = Array.isArray(data) ? data : data.results || []

      // Format the user data consistently
      const formattedUsers = userData.map((user: any) => ({
        id: user.id?.toString() || Math.random().toString(36).substring(2, 9),
        login: user.username || user.login || "",
        username: user.username || user.login || "",
        email: user.email || "",
        createdAt: user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "",
        role: user.role || user.groups?.[0]?.name || "User",
        isActive: user.is_active !== undefined ? user.is_active : true,
      }))

      // Update the local state
      setUsers(formattedUsers)
    } catch (error) {
      console.error(`Error fetching users for language ${lang}:`, error)
      setError("Failed to load users. Using mock data instead.")

      // Use mock data as fallback
      const mockUsers = [
        {
          id: "1",
          login: "admin",
          username: "admin",
          email: "admin@example.com",
          createdAt: "01/01/2023",
          role: "Administrator",
          isActive: true,
        },
        {
          id: "2",
          login: "manager",
          username: "manager",
          email: "manager@example.com",
          createdAt: "15/02/2023",
          role: "Manager",
          isActive: true,
        },
        {
          id: "3",
          login: "editor",
          username: "editor",
          email: "editor@example.com",
          createdAt: "20/03/2023",
          role: "Editor",
          isActive: true,
        },
        {
          id: "4",
          login: "user1",
          username: "user1",
          email: "user1@example.com",
          createdAt: "05/04/2023",
          role: "User",
          isActive: true,
        },
        {
          id: "5",
          login: "user2",
          username: "user2",
          email: "user2@example.com",
          createdAt: "12/05/2023",
          role: "User",
          isActive: false,
        },
      ]

      setUsers(mockUsers)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Only fetch if we're actually on the users page
    if (typeof window !== "undefined" && window.location.pathname.includes("/dashboard/users")) {
      const fetchUsersData = async () => {
        setIsLoading(true)
        setError(null)

        try {
          // Use the API service to fetch users
          const data = await apiService.users.getAll(selectedLanguage)
          console.log("API response received:", data)

          const userData = Array.isArray(data) ? data : data.results || []

          // Format the user data consistently
          const formattedUsers = userData.map((user: any) => ({
            id: user.id?.toString() || Math.random().toString(36).substring(2, 9),
            login: user.username || user.login || "",
            username: user.username || user.login || "",
            email: user.email || "",
            createdAt: user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "",
            role: user.role || user.groups?.[0]?.name || "User",
            isActive: user.is_active !== undefined ? user.is_active : true,
          }))

          // Update the local state
          setUsers(formattedUsers)
        } catch (error) {
          console.error(`Error fetching users for language ${selectedLanguage}:`, error)
          setError("Failed to load users. Using mock data instead.")

          // Use mock data as fallback
          const mockUsers = [
            {
              id: "1",
              login: "admin",
              username: "admin",
              email: "admin@example.com",
              createdAt: "01/01/2023",
              role: "Administrator",
              isActive: true,
            },
            {
              id: "2",
              login: "manager",
              username: "manager",
              email: "manager@example.com",
              createdAt: "15/02/2023",
              role: "Manager",
              isActive: true,
            },
            {
              id: "3",
              login: "editor",
              username: "editor",
              email: "editor@example.com",
              createdAt: "20/03/2023",
              role: "Editor",
              isActive: true,
            },
            {
              id: "4",
              login: "user1",
              username: "user1",
              email: "user1@example.com",
              createdAt: "05/04/2023",
              role: "User",
              isActive: true,
            },
            {
              id: "5",
              login: "user2",
              username: "user2",
              email: "user2@example.com",
              createdAt: "12/05/2023",
              role: "User",
              isActive: false,
            },
          ]

          setUsers(mockUsers)
        } finally {
          setIsLoading(false)
        }
      }

      fetchUsersData()
    }
  }, [selectedLanguage, toast, t])

  // Filter users based on search criteria
  const filteredUsers = users.filter((user) => {
    const matchesLogin =
      user.username?.toLowerCase().includes(loginFilter.toLowerCase()) ||
      user.login?.toLowerCase().includes(loginFilter.toLowerCase()) ||
      false
    const matchesId = idFilter === "" || user.id === idFilter
    return matchesLogin && matchesId
  })

  // Update the handleDeleteUser function to properly delete users and update UI immediately
  const handleDeleteUser = async (id: string) => {
    try {
      // Use the API service to delete the user
      await apiService.users.delete(id, selectedLanguage)

      // Update the UI immediately by removing the deleted user
      setUsers(users.filter((user) => user.id !== id))

      toast({
        title: t("success"),
        description: t("userDeletedSuccessfully"),
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: t("error"),
        description: t("errorDeletingUser"),
        variant: "destructive",
      })
    }
  }

  const handleRefreshUsers = () => {
    fetchUsers(selectedLanguage)
  }

  const handleApplyFilters = () => {
    // Already filtered by the filteredUsers variable
  }

  const handleClearFilters = () => {
    setLoginFilter("")
    setIdFilter("")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">{t("users")}</h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6 rounded-md border filter-section-dark p-4">
          <h3 className="mb-4 text-lg font-medium">{t("filters")}</h3>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="login" className="mb-1 block text-sm font-medium">
                {t("login")}
              </label>
              <Input
                id="login"
                value={loginFilter}
                onChange={(e) => setLoginFilter(e.target.value)}
                placeholder={t("login")}
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
          <h3 className="text-xl font-medium">{t("users")}</h3>
          <div className="flex gap-2">
            <Button
              onClick={handleRefreshUsers}
              variant="outline"
              className="border-[#374151] text-white hover:bg-[#3f4b5b]"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("refresh")}
            </Button>
            <Button className="button-primary" asChild>
              <Link href="/dashboard/users/add">
                <Plus className="mr-2 h-4 w-4" />
                {t("add")}
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">{t("loading")}</span>
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center">
              <p>{t("noUsersFound")}</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="table-header-dark">
                <TableRow>
                  <TableHead className="text-white">{t("login")}</TableHead>
                  <TableHead className="text-white">{t("email")}</TableHead>
                  <TableHead className="text-white">{t("role")}</TableHead>
                  <TableHead className="text-white">{t("status")}</TableHead>
                  <TableHead className="text-white">{t("created")}</TableHead>
                  <TableHead className="text-white">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.slice(0, Number.parseInt(rowsPerPage)).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username || user.login}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {user.isActive ? t("active") : t("inactive")}
                      </span>
                    </TableCell>
                    <TableCell>{user.createdAt || new Date().toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/users/${user.id}/edit`}>
                            <Pencil className="h-4 w-4 text-amber-500" />
                          </Link>
                        </Button>
                        <DeleteDialog
                          itemName={user.username || user.login}
                          onDelete={() => handleDeleteUser(user.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      {t("noUsersMatchFilter")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <div className="flex items-center justify-end p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("rowsPerPage")}</span>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-20 dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
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
