"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteDialog } from "@/components/delete-dialog"
import { Pencil } from "lucide-react"
import { useStore } from "@/lib/store"

export default function UsersPage() {
  const { t } = useLanguage()
  const { users, deleteUser } = useStore()
  const [loginFilter, setLoginFilter] = useState("")
  const [idFilter, setIdFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")

  const filteredUsers = users.filter((user) => {
    const matchesLogin = user.login.toLowerCase().includes(loginFilter.toLowerCase())
    const matchesId = idFilter === "" || user.id === idFilter
    return matchesLogin && matchesId
  })

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

        <div className="mb-6 rounded-md border bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-medium">{t("filters")}</h3>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="login" className="mb-1 block text-sm font-medium">
                {t("login")}
              </label>
              <Input
                id="login"
                value={loginFilter}
                onChange={(e) => setLoginFilter(e.target.value)}
                placeholder={t("login")}
                className="dark:bg-gray-700 dark:border-gray-600"
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
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleApplyFilters} className="bg-[#2d3741]">
              {t("apply")}
            </Button>
            <Button onClick={handleClearFilters} variant="outline" className="dark:border-gray-600 dark:text-white">
              {t("clear")}
            </Button>
          </div>
        </div>

        <div className="mb-4 flex justify-between">
          <h3 className="text-xl font-medium">{t("users")}</h3>
          <Button className="bg-[#e91e63]" asChild>
            <Link href="/dashboard/users/add">{t("add")}</Link>
          </Button>
        </div>

        <div className="rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("login")}</TableHead>
                <TableHead>{t("created")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.slice(0, Number.parseInt(rowsPerPage)).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.login}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/users/${user.id}/edit`}>
                          <Pencil className="h-4 w-4 text-amber-500" />
                        </Link>
                      </Button>
                      <DeleteDialog itemName={user.login} onDelete={() => deleteUser(user.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

