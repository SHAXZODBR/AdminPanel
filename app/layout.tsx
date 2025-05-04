import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "UZFK Admin Dashboard",
  description: "Admin dashboard for UZFK website",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"
