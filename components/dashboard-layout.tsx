"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { ChevronLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  // Fix the back button navigation logic
  const handleBackClick = () => {
    // Get the current path segments
    const segments = pathname.split("/").filter(Boolean)

    // If we're in an edit or add page, go back to the main table page
    if (
      segments.length > 2 &&
      (segments[2] === "edit" || segments[2] === "add" || segments.includes("edit") || segments.includes("add"))
    ) {
      const basePath = "/" + segments.slice(0, 2).join("/")
      router.push(basePath)
    }
    // If we're at the second level, go to users
    else if (segments.length === 2) {
      router.push("/dashboard/users")
    }
    // Otherwise go up one level
    else if (segments.length > 2) {
      const newPath = "/" + segments.slice(0, segments.length - 1).join("/")
      router.push(newPath)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:bg-gray-900 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleBackClick}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{t("dashboard")}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-white p-6 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}

