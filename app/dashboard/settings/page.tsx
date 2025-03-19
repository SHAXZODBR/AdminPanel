"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Bell, Moon, Sun, Palette, Shield, Mail, Globe, Smartphone, BellRing, Languages } from "lucide-react"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    securityAlerts: true,
    twoFactorAuth: false,
    sessionTimeout: "30",
  })

  const handleSaveSettings = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
    setIsLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h2 className="mb-6 text-2xl font-bold">{t("settings")}</h2>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">
              <Palette className="mr-2 h-4 w-4" />
              {t("general")}
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              {t("notifications")}
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              {t("security")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Globe className="mb-2 h-5 w-5" />
                    {t("language")}
                  </CardTitle>
                  <CardDescription>{t("chooseLanguage")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("preferredLanguage")}</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="uz">O'zbekcha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Palette className="mb-2 h-5 w-5" />
                    {t("appearance")}
                  </CardTitle>
                  <CardDescription>{t("customizeInterface")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("theme")}</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="mr-2 h-4 w-4" />
                            {t("light")}
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="mr-2 h-4 w-4" />
                            {t("dark")}
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Smartphone className="mr-2 h-4 w-4" />
                            {t("system")}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Bell className="mb-2 h-5 w-5" />
                  {t("notificationPreferences")}
                </CardTitle>
                <CardDescription>{t("manageNotifications")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{t("emailNotifications")}</span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-notifications" className="flex items-center space-x-2">
                    <BellRing className="h-4 w-4" />
                    <span>{t("pushNotifications")}</span>
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="weekly-digest" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{t("weeklyDigest")}</span>
                  </Label>
                  <Switch
                    id="weekly-digest"
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Shield className="mb-2 h-5 w-5" />
                    {t("securitySettings")}
                  </CardTitle>
                  <CardDescription>{t("manageSecuritySettings")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="security-alerts" className="flex items-center space-x-2">
                      <BellRing className="h-4 w-4" />
                      <span>{t("securityAlerts")}</span>
                    </Label>
                    <Switch
                      id="security-alerts"
                      checked={settings.securityAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, securityAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="two-factor" className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>{t("twoFactorAuth")}</span>
                    </Label>
                    <Switch
                      id="two-factor"
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("sessionTimeout")}</Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 {t("minutes")}</SelectItem>
                        <SelectItem value="30">30 {t("minutes")}</SelectItem>
                        <SelectItem value="60">60 {t("minutes")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Languages className="mb-2 h-5 w-5" />
                    {t("activeDevices")}
                  </CardTitle>
                  <CardDescription>{t("manageDevices")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chrome - Windows</p>
                        <p className="text-sm text-muted-foreground">Last active: 2 minutes ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {t("revoke")}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Safari - iPhone</p>
                        <p className="text-sm text-muted-foreground">Last active: 15 minutes ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {t("revoke")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline">{t("cancel")}</Button>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? t("saving") : t("saveChanges")}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

