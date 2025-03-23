import type React from "react"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Admin Dashboard",
  description: "Multilingual Admin Dashboard",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"



import './globals.css'