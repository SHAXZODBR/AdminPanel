"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { StoreProvider } from "@/lib/store"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
