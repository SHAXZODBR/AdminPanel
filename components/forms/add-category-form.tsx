"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function AddCategoryForm() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    language: "ru",
    position: "",
    parentCategory: "",
    name: "",
    nameTranslit: "",
    description: "",
    descriptionTranslit: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Category has been created successfully",
      })
      setIsLoading(false)
      setFormData({
        language: "ru",
        position: "",
        parentCategory: "",
        name: "",
        nameTranslit: "",
        description: "",
        descriptionTranslit: "",
      })
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("addCategory")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
                <SelectItem value="life">Мелочи жизни</SelectItem>
                <SelectItem value="health">Здоровье</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("name")}</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("name")}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("description")}</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t("description")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("descriptionTranslit")}</label>
              <Textarea
                value={formData.descriptionTranslit}
                onChange={(e) => setFormData({ ...formData, descriptionTranslit: e.target.value })}
                placeholder={t("descriptionTranslit")}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("saving") : t("save")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

