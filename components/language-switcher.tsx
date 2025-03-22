"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-dashboard-accent border-dashboard-border text-dashboard-foreground"
        >
          <Globe className="h-4 w-4" />
          <span className="uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-dashboard-accent border-dashboard-border">
        <DropdownMenuItem
          onClick={() => setLanguage("uz-cyrl")}
          className="text-dashboard-foreground hover:bg-dashboard-muted"
        >
          <span className={language === "uz-cyrl" ? "font-bold" : ""}>Ўзбекча (Кирилл)</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("ru")}
          className="text-dashboard-foreground hover:bg-dashboard-muted"
        >
          <span className={language === "ru" ? "font-bold" : ""}>Русский</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("uz")}
          className="text-dashboard-foreground hover:bg-dashboard-muted"
        >
          <span className={language === "uz" ? "font-bold" : ""}>O'zbekcha</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

