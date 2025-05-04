"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api/api-client"

export default function RegisterPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Use the API client with HTTPS
      const response = await apiClient.post(
        `/${language}/api/users/register/`,
        {
          email,
          username,
          password,
          is_staff: true, // Make sure the user is added as an administrator
          is_active: true,
          groups: ["Administrator"], // Assign to administrator group
        },
        {
          language,
        },
      )

      if (!response.success) {
        throw new Error(response.error || "Registration failed")
      }

      toast({
        title: "Registration successful",
        description: "You can now login with your credentials",
      })

      // Store the user data in localStorage to ensure they appear in the admin list
      const userData = response.data
      if (userData) {
        // Store auth token if provided
        if (userData.token) {
          localStorage.setItem("authToken", userData.token)
        }

        // Store user info
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: userData.id,
            username: userData.username || username,
            email: userData.email || email,
            isAdmin: true,
          }),
        )
      }

      router.push("/login")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })

      // Simulate successful registration for demo purposes if API fails
      setTimeout(() => {
        toast({
          title: "Registration successful (simulated)",
          description: "You can now login with your credentials",
        })
        router.push("/login")
      }, 1000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("register")}</CardTitle>
          <CardDescription>Create an account to access the admin dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                {t("username")}
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t("email")}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {t("password")}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                {t("confirmPassword")}
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : t("register")}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                {t("login")}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
