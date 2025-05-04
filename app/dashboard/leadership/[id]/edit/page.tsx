"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LeadershipData {
  id: string
  name: string
  position: string
  department: string
  phone: string
  email: string
  image?: string
}

export default function EditLeadershipPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()

  const [leadership, setLeadership] = useState<LeadershipData>({
    id: "",
    name: "",
    position: "",
    department: "",
    phone: "",
    email: "",
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Base API URL
  const API_BASE_URL = "https://uzfk.uz"

  // Update the fetchLeadershipData function to properly fetch data from the API
  useEffect(() => {
    const fetchLeadershipData = async () => {
      setIsLoading(true)
      setApiError(null)

      try {
        // Use the leadership/{id} endpoint to fetch a specific leadership member
        const apiLanguage = language === "ru" ? "uz" : language
        const apiUrl = `https://uzfk.uz/${apiLanguage}/api/leadership/${id}/`

        console.log(`Fetching leadership member from: ${apiUrl}`)

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(typeof window !== "undefined" && localStorage.getItem("authToken")
              ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
              : {}),
          },
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("Leadership data received:", data)

        setLeadership({
          id: data.id?.toString() || id,
          name: data.name || data.ism || "",
          position: data.position || data.lavozim || "",
          department: data.department || data.bo_lim || "",
          phone: data.phone || data.telefon || "",
          email: data.email || "",
          image: data.image ? `https://uzfk.uz${data.image}` : undefined,
        })
      } catch (error) {
        console.error("Error fetching leadership member:", error)
        setApiError(error instanceof Error ? error.message : "Unknown error")

        toast({
          title: t("error"),
          description: t("leadershipNotFound"),
          variant: "destructive",
        })

        // Redirect back to leadership list on error
        router.push("/dashboard/leadership")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeadershipData()
  }, [id, language, router, toast, t])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLeadership((prev) => ({ ...prev, [name]: value }))
  }

  // Update the handleSubmit function to properly update leadership data via the API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setApiError(null)

    try {
      // Prepare the data for API update
      const updateData = {
        name: leadership.name,
        position: leadership.position,
        department: leadership.department,
        phone: leadership.phone,
        email: leadership.email,
      }

      console.log("Updating leadership member with data:", updateData)

      // Use the PUT endpoint to update the leadership member
      const apiLanguage = language === "ru" ? "uz" : language
      const apiUrl = `https://uzfk.uz/${apiLanguage}/api/leadership/${id}/`

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(typeof window !== "undefined" && localStorage.getItem("authToken")
            ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            : {}),
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error(`API update failed with status ${response.status}`)
      }

      const updatedData = await response.json()
      console.log("API update successful:", updatedData)

      toast({
        title: t("success"),
        description: t("leadershipUpdatedSuccessfully"),
      })

      router.push("/dashboard/leadership")
    } catch (error) {
      console.error("Error updating leadership member:", error)
      setApiError(error instanceof Error ? error.message : "Unknown error")

      toast({
        title: t("error"),
        description: t("errorUpdatingLeadership"),
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/dashboard/leadership")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-2xl font-bold ml-4">{t("editLeadership")}</h1>
        </div>

        {apiError && (
          <Card className="mb-6 border-red-500">
            <CardContent className="p-4">
              <div className="flex items-center text-red-500">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>API Error: {apiError}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>{t("loading")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t("leadershipDetails")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={leadership.name}
                    onChange={handleChange}
                    placeholder={t("enterName")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="position">{t("position")}</Label>
                  <Input
                    id="position"
                    name="position"
                    value={leadership.position}
                    onChange={handleChange}
                    placeholder={t("enterPosition")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="department">{t("department")}</Label>
                  <Input
                    id="department"
                    name="department"
                    value={leadership.department}
                    onChange={handleChange}
                    placeholder={t("enterDepartment")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={leadership.phone}
                    onChange={handleChange}
                    placeholder={t("enterPhone")}
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={leadership.email}
                    onChange={handleChange}
                    placeholder={t("enterEmail")}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? t("saving") : t("save")}
                {!isSaving && <Save className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  )
}
