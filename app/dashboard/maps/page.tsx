"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { UzbekistanMap } from "@/components/uzbekistan-map"

// Define region data structure
interface RegionData {
  id: string
  name: string
  chairmanName: string
  language: string
}

// Hardcoded regions for Uzbekistan
const REGIONS = [
  "tashkent",
  "tashkent_city",
  "andijan",
  "bukhara",
  "fergana",
  "jizzakh",
  "karakalpakstan",
  "kashkadarya",
  "khorezm",
  "namangan",
  "navoi",
  "samarkand",
  "surkhandarya",
  "syrdarya",
]

export default function MapsPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [regionsData, setRegionsData] = useState<RegionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRegion, setEditingRegion] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  // Load region data
  useEffect(() => {
    const loadRegionsData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockData: RegionData[] = REGIONS.map((region) => ({
          id: region,
          name: getRegionName(region, language),
          chairmanName: `${getRegionName(region, language)} Fermerlar Kengashi Raisi`,
          language,
        }))

        setRegionsData(mockData)
      } catch (error) {
        console.error("Error loading regions data:", error)
        toast({
          title: t("error"),
          description: t("errorLoadingRegionsData"),
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadRegionsData()
  }, [language, toast, t])

  // Helper function to get region name in the current language
  function getRegionName(regionId: string, lang: string): string {
    const regionNames: Record<string, Record<string, string>> = {
      tashkent: {
        uz: "Toshkent viloyati",
        "uz-cyrl": "Тошкент вилояти",
        ru: "Ташкентская область",
      },
      tashkent_city: {
        uz: "Toshkent shahri",
        "uz-cyrl": "Тошкент шаҳри",
        ru: "город Ташкент",
      },
      andijan: {
        uz: "Andijon viloyati",
        "uz-cyrl": "Андижон вилояти",
        ru: "Андижанская область",
      },
      bukhara: {
        uz: "Buxoro viloyati",
        "uz-cyrl": "Бухоро вилояти",
        ru: "Бухарская область",
      },
      fergana: {
        uz: "Farg'ona viloyati",
        "uz-cyrl": "Фарғона вилояти",
        ru: "Ферганская область",
      },
      jizzakh: {
        uz: "Jizzax viloyati",
        "uz-cyrl": "Жиззах вилояти",
        ru: "Джизакская область",
      },
      karakalpakstan: {
        uz: "Qoraqalpog'iston Respublikasi",
        "uz-cyrl": "Қорақалпоғистон Республикаси",
        ru: "Республика Каракалпакстан",
      },
      kashkadarya: {
        uz: "Qashqadaryo viloyati",
        "uz-cyrl": "Қашқадарё вилояти",
        ru: "Кашкадарьинская область",
      },
      khorezm: {
        uz: "Xorazm viloyati",
        "uz-cyrl": "Хоразм вилояти",
        ru: "Хорезмская область",
      },
      namangan: {
        uz: "Namangan viloyati",
        "uz-cyrl": "Наманган вилояти",
        ru: "Наманганская область",
      },
      navoi: {
        uz: "Navoiy viloyati",
        "uz-cyrl": "Навоий вилояти",
        ru: "Навоийская область",
      },
      samarkand: {
        uz: "Samarqand viloyati",
        "uz-cyrl": "Самарқанд вилояти",
        ru: "Самаркандская область",
      },
      surkhandarya: {
        uz: "Surxondaryo viloyati",
        "uz-cyrl": "Сурхондарё вилояти",
        ru: "Сурхандарьинская область",
      },
      syrdarya: {
        uz: "Sirdaryo viloyati",
        "uz-cyrl": "Сирдарё вилояти",
        ru: "Сырдарьинская область",
      },
    }

    return regionNames[regionId]?.[lang] || regionId
  }

  const handleEditClick = (regionId: string, currentValue: string) => {
    setEditingRegion(regionId)
    setEditValue(currentValue)
  }

  const handleSaveEdit = (regionId: string) => {
    setRegionsData((prev) =>
      prev.map((region) => (region.id === regionId ? { ...region, chairmanName: editValue } : region)),
    )
    setEditingRegion(null)

    toast({
      title: t("success"),
      description: t("regionDataUpdatedSuccessfully"),
    })
  }

  const handleCancelEdit = () => {
    setEditingRegion(null)
  }

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">{t("maps")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle>{t("mapPreview")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border rounded-md overflow-hidden" style={{ height: "500px" }}>
                <UzbekistanMap onRegionHover={handleRegionHover} activeRegion={hoveredRegion} />

                {hoveredRegion && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
                    <h3 className="font-medium mb-1">{getRegionName(hoveredRegion, language)}</h3>
                    <p className="text-sm">
                      {t("farmersCouncilChairman")}:{" "}
                      {regionsData.find((r) => r.id === hoveredRegion)?.chairmanName || ""}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Region Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t("regionsData")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("region")}</TableHead>
                    <TableHead>{t("chairmanName")}</TableHead>
                    <TableHead className="w-[100px]">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        {t("loading")}...
                      </TableCell>
                    </TableRow>
                  ) : regionsData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        {t("noRegionsFound")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    regionsData.map((region) => (
                      <TableRow key={region.id}>
                        <TableCell>{region.name}</TableCell>
                        <TableCell>
                          {editingRegion === region.id ? (
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full"
                            />
                          ) : (
                            region.chairmanName
                          )}
                        </TableCell>
                        <TableCell>
                          {editingRegion === region.id ? (
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSaveEdit(region.id)}
                                title={t("save")}
                              >
                                <Save className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={handleCancelEdit} title={t("cancel")}>
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditClick(region.id, region.chairmanName)}
                              title={t("edit")}
                            >
                              <Pencil className="h-4 w-4 text-amber-500" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
