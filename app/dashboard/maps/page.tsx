"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Pencil, Upload } from "lucide-react"

export default function MapsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { toast } = useToast()

  // Mock data for maps by language
  const mockMapsByLanguage = {
    "uz-cyrl": [
      {
        id: "1",
        name: "Ўзбекистон маъмурий харитаси",
        description: "Ўзбекистоннинг маъмурий бўлиниши",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "13.03.2025 11:00",
      },
      {
        id: "2",
        name: "Тошкент шаҳар харитаси",
        description: "Тошкент шаҳар туманларининг батафсил харитаси",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "12.03.2025 11:14",
      },
      {
        id: "3",
        name: "Ҳудудий Кенгашлар харитаси",
        description: "Барча ҳудудий кенгашларни кўрсатувчи харита",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "11.03.2025 18:09",
      },
    ],
    ru: [
      {
        id: "1",
        name: "Административная карта Узбекистана",
        description: "Административное деление Узбекистана",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "13.03.2025 11:00",
      },
      {
        id: "2",
        name: "Карта города Ташкент",
        description: "Подробная карта районов города Ташкент",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "12.03.2025 11:14",
      },
      {
        id: "3",
        name: "Карта Региональных Советов",
        description: "Карта, показывающая все региональные советы",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "11.03.2025 18:09",
      },
    ],
    uz: [
      {
        id: "1",
        name: "O'zbekiston ma'muriy xaritasi",
        description: "O'zbekistonning ma'muriy bo'linishi",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "13.03.2025 11:00",
      },
      {
        id: "2",
        name: "Toshkent shahar xaritasi",
        description: "Toshkent shahar tumanlarining batafsil xaritasi",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "12.03.2025 11:14",
      },
      {
        id: "3",
        name: "Hududiy Kengashlar xaritasi",
        description: "Barcha hududiy kengashlarni ko'rsatuvchi xarita",
        imageUrl: "/placeholder.svg?height=200&width=300",
        lastUpdated: "11.03.2025 18:09",
      },
    ],
  }

  const [mapsByLanguage, setMapsByLanguage] = useState(mockMapsByLanguage)

  const handleUploadMap = (id: string) => {
    // In a real application, this would open a file picker and upload the file
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "image/*"
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files[0]) {
        // Simulate file upload
        toast({
          title: "Success",
          description: "Map has been updated successfully",
        })

        // Update the lastUpdated timestamp only for the current language
        setMapsByLanguage((prev) => {
          const newState = { ...prev }
          newState[language] = newState[language].map((map) =>
            map.id === id ? { ...map, lastUpdated: new Date().toLocaleString("ru-RU") } : map,
          )
          return newState
        })
      }
    }
    fileInput.click()
  }

  const handleEditDetails = (id: string) => {
    // In a real application, this would open a modal or navigate to an edit page
    toast({
      title: "Edit Details",
      description: "This would open a form to edit map details",
    })
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t("maps")}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("language")}:</span>
              <Select value={language} onValueChange={(value: "uz-cyrl" | "ru" | "uz") => setLanguage(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uz-cyrl">Ўзбекча (Кирилл)</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="uz">O'zbekcha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="filter-section-dark">
            <CardTitle className="text-white">{t("manageMaps")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-gray-800">
                <TableRow>
                  <TableHead>{t("preview")}</TableHead>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("description")}</TableHead>
                  <TableHead>{t("lastUpdated")}</TableHead>
                  <TableHead>{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mapsByLanguage[language]?.map((map) => (
                  <TableRow key={map.id} className="border-gray-200 dark:border-gray-700">
                    <TableCell>
                      <div className="relative h-20 w-32 overflow-hidden rounded border">
                        <Image src={map.imageUrl || "/placeholder.svg"} alt={map.name} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{map.name}</TableCell>
                    <TableCell>{map.description}</TableCell>
                    <TableCell>{map.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleUploadMap(map.id)}
                        >
                          <Upload className="h-4 w-4" />
                          {t("uploadNew")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleEditDetails(map.id)}
                        >
                          <Pencil className="h-4 w-4" />
                          {t("editDetails")}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!mapsByLanguage[language] ||
                  (mapsByLanguage[language].length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No maps found for this language.
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

