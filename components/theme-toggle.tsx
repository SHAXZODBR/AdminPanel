"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={t(theme === "dark" ? "lightMode" : "darkMode")}
      className="bg-dashboard-accent border-dashboard-border text-dashboard-foreground"
    >
      {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
    </Button>
  )
}

