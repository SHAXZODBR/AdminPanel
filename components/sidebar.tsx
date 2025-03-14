"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { Home, Users, FolderTree, Tag, FileText, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const routes = [
    {
      icon: Home,
      label: t("home"),
      href: "/dashboard",
    },
    {
      icon: Users,
      label: t("users"),
      href: "/dashboard/users",
    },
    {
      icon: FolderTree,
      label: t("categories"),
      href: "/dashboard/categories",
    },
    {
      icon: Tag,
      label: t("tags"),
      href: "/dashboard/tags",
    },
    {
      icon: FileText,
      label: t("articles"),
      href: "/dashboard/articles",
    },
    {
      icon: Settings,
      label: t("settings"),
      href: "/dashboard/settings",
    },
  ]

  return (
    <div className="sidebar-dark flex flex-col h-full w-64">
      <div className="flex h-16 items-center border-b border-[#374151] px-6">
        <h1 className="text-lg font-semibold text-white">{t("administrator")}</h1>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === route.href ? "bg-[#e91e63] text-white" : "text-white hover:bg-[#3f4b5b]",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-[#374151] p-2">
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated")
            window.location.href = "/login"
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3f4b5b]"
        >
          <LogOut className="h-5 w-5" />
          {t("logout")}
        </button>
      </div>
    </div>
  )
}

