"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={t(theme === "dark" ? "lightMode" : "darkMode")}
      className="bg-dashboard-muted border-dashboard-border text-dashboard-foreground"
    >
      {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
    </Button>
  )
}
