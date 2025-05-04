"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Only run authentication check after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true)
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [router])

  // Don't render anything until client-side
  if (!mounted) {
    return null
  }

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Admin Dashboard</CardTitle>
          <CardDescription>Please log in to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            This is the administration panel for the UZFK website. You need to be authenticated to access the dashboard.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">
            Go to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
