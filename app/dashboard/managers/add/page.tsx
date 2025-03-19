"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"
import { Paperclip } from "lucide-react"

export default function AddManagerPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const { addLeader } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: language,
    fullName: "",
    position: "",
    phoneNumber: "",
    email: "", // Add this line
    bio: "",
    photo: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.position || !formData.phoneNumber || !formData.email) {
      toast({
        title: "Error",
        description: "Full name, position, phone number, and email are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Add leader to store
    addLeader({
      language: formData.language as "en" | "ru" | "uz",
      fullName: formData.fullName,
      position: formData.position,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      bio: formData.bio,
      photo: "/placeholder.svg?height=100&width=100", // In a real app, we would upload the photo
    })

    toast({
      title: "Success",
      description: "Manager has been added successfully",
    })

    setIsLoading(false)
    router.push("/dashboard/managers")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, photo: file })
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("addManager")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("addManager")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("language")}</label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский язык</SelectItem>
                    <SelectItem value="uz">O'zbek tili</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("fullName")}</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={t("fullName")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("position")}</label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder={t("position")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("phoneNumber")}</label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("email")}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("bio")}</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder={t("bio")}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("photo")}</label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="photo" />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("photo")?.click()}>
                    <Paperclip className="mr-2 h-4 w-4" />
                    {t("uploadPhoto")}
                  </Button>
                  {formData.photo && <span className="text-sm">{formData.photo.name}</span>}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="button-primary" disabled={isLoading}>
                  {isLoading ? t("saving") : t("save")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

