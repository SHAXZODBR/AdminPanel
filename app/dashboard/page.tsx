"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MessageSquare } from "lucide-react"

export default function DashboardPage() {
  const { language, t } = useLanguage()
  const [stats, setStats] = useState({
    articles: 0,
    comments: 0,
  })

  useEffect(() => {
    // Simulate fetching stats based on selected language
    const mockStats = {
      en: { articles: 5, comments: 3 },
      ru: { articles: 7, comments: 2 },
      uz: { articles: 4, comments: 1 },
    }

    setStats(mockStats[language as keyof typeof mockStats])
  }, [language])

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-purple-600 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8" />
                <div>
                  <p className="text-3xl font-bold">{stats.articles}</p>
                  <p className="text-sm">{t("articles")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-teal-600 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8" />
                <div>
                  <p className="text-3xl font-bold">{stats.comments}</p>
                  <p className="text-sm">{t("comments")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

