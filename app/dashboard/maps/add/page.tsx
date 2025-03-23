"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddMapPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("uz_latn")
  const [images, setImages] = useState<File[]>([])

  const handleImagesSelected = (files: File[]) => {
    setImages(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically upload the images and save the map data
    // This is a placeholder for the actual implementation

    console.log({
      title,
      description,
      language,
      images,
    })

    // Redirect back to the maps list after saving
    router.push("/dashboard/maps")
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        {t("add")} {t("map")}
      </h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("mapDetails")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">{t("title")}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("enterMapTitle")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">{t("description")}</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("enterMapDescription")}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("selectLanguage")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectLanguage")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uz_latn">O'zbekcha (Lotin)</SelectItem>
                <SelectItem value="uz_cyrl">Ўзбекча (Кирилл)</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("uploadImages")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload onImagesSelected={handleImagesSelected} multiple={true} />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/maps")}>
            {t("cancel")}
          </Button>
          <Button type="submit">{t("save")}</Button>
        </div>
      </form>
    </div>
  )
}

