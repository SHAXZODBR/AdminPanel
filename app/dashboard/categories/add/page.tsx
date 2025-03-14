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

export default function AddCategoryPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const { addCategory } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: language,
    position: "",
    parentCategory: "",
    name: "",
    nameTranslit: "",
    description: "",
    descriptionTranslit: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.position) {
      toast({
        title: "Error",
        description: "Name and position are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Add category to store
    addCategory({
      language: formData.language as "en" | "ru" | "uz",
      name: formData.name,
      parent: formData.parentCategory || "None",
      position: Number.parseInt(formData.position),
    })

    toast({
      title: "Success",
      description: "Category has been created successfully",
    })

    setIsLoading(false)
    router.push("/dashboard/categories")
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="mb-6 text-2xl font-bold">{t("addCategory")}</h2>
        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("addCategory")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  <label className="text-sm font-medium">{t("position")}</label>
                  <Input
                    type="number"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="999"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("parentCategory")}</label>
                <Select
                  value={formData.parentCategory}
                  onValueChange={(value) => setFormData({ ...formData, parentCategory: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectParentCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Мелочи жизни">Мелочи жизни</SelectItem>
                    <SelectItem value="Здоровье">Здоровье</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("name")}</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("name")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("nameTranslit")}</label>
                  <Input
                    value={formData.nameTranslit}
                    onChange={(e) => setFormData({ ...formData, nameTranslit: e.target.value })}
                    placeholder={t("nameTranslit")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("description")}</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t("description")}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("descriptionTranslit")}</label>
                  <Textarea
                    value={formData.descriptionTranslit}
                    onChange={(e) => setFormData({ ...formData, descriptionTranslit: e.target.value })}
                    placeholder={t("descriptionTranslit")}
                    rows={4}
                  />
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

