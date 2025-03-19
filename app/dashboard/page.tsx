"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to users page
    router.push("/dashboard/users")
  }, [router])

  return null
}

