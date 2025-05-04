"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

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

  // Update the handleSubmit function to use the mock maps service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // First upload images if any
      let imageUrl = "/placeholder.svg?height=300&width=500"

      if (images.length > 0) {
        const uploadResponse = await api.maps.uploadImage(images[0])
        imageUrl = uploadResponse.url
      }

      // Create the map using the mock service
      await api.maps.create({
        language: language as "en" | "ru" | "uz" | "uz-cyrl",
        title,
        description,
        imageUrl,
      })

      toast({
        title: t("success"),
        description: t("mapAddedSuccessfully"),
      })

      // Redirect back to the maps list after saving
      router.push("/dashboard/maps")
    } catch (error) {
      console.error("Error adding map:", error)
      toast({
        title: t("error"),
        description: t("errorAddingMap"),
        variant: "destructive",
      })
    }
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
\
\
\
\
