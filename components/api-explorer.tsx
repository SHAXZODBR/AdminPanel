"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Search, Loader2 } from "lucide-react"
import apiClient from "@/lib/api-client"
import { Alert, AlertDescription } from "@/components/ui/alert"

// API endpoint types
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type EndpointCategory =
  | "users"
  | "leadership"
  | "local-council"
  | "social-networks"
  | "contact"
  | "content"
  | "sector-and-department"
  | "organization"
  | "admin-youtube"
  | "auth"

interface Endpoint {
  method: HttpMethod
  path: string
  description: string
  requiresId: boolean
  requiresBody: boolean
}

// Define all endpoints
const endpoints: Record<EndpointCategory, Endpoint[]> = {
  users: [
    { method: "GET", path: "/users/", description: "Get all users", requiresId: false, requiresBody: false },
    { method: "POST", path: "/users/", description: "Create a new user", requiresId: false, requiresBody: true },
    { method: "GET", path: "/users/get-me", description: "Get current user", requiresId: false, requiresBody: false },
    { method: "GET", path: "/users/{id}/", description: "Get user by ID", requiresId: true, requiresBody: false },
    { method: "PUT", path: "/users/{id}/", description: "Update user", requiresId: true, requiresBody: true },
    {
      method: "PATCH",
      path: "/users/{id}/",
      description: "Partially update user",
      requiresId: true,
      requiresBody: true,
    },
    { method: "DELETE", path: "/users/{id}/", description: "Delete user", requiresId: true, requiresBody: false },
  ],
  leadership: [
    { method: "GET", path: "/leadership/", description: "Get all leadership", requiresId: false, requiresBody: false },
    {
      method: "POST",
      path: "/leadership/",
      description: "Create a new leadership entry",
      requiresId: false,
      requiresBody: true,
    },
    {
      method: "GET",
      path: "/leadership/{id}/",
      description: "Get leadership by ID",
      requiresId: true,
      requiresBody: false,
    },
    {
      method: "PUT",
      path: "/leadership/{id}/",
      description: "Update leadership",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "PATCH",
      path: "/leadership/{id}/",
      description: "Partially update leadership",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "DELETE",
      path: "/leadership/{id}/",
      description: "Delete leadership",
      requiresId: true,
      requiresBody: false,
    },
  ],
  "local-council": [
    {
      method: "GET",
      path: "/local-council/",
      description: "Get all local councils",
      requiresId: false,
      requiresBody: false,
    },
    {
      method: "POST",
      path: "/local-council/",
      description: "Create a new local council",
      requiresId: false,
      requiresBody: true,
    },
    {
      method: "GET",
      path: "/local-council/{id}/",
      description: "Get local council by ID",
      requiresId: true,
      requiresBody: false,
    },
    {
      method: "PUT",
      path: "/local-council/{id}/",
      description: "Update local council",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "PATCH",
      path: "/local-council/{id}/",
      description: "Partially update local council",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "DELETE",
      path: "/local-council/{id}/",
      description: "Delete local council",
      requiresId: true,
      requiresBody: false,
    },
  ],
  "social-networks": [
    {
      method: "GET",
      path: "/social-networks/",
      description: "Get all social networks",
      requiresId: false,
      requiresBody: false,
    },
    {
      method: "POST",
      path: "/social-networks/",
      description: "Create a new social network",
      requiresId: false,
      requiresBody: true,
    },
    {
      method: "GET",
      path: "/social-networks/{id}/",
      description: "Get social network by ID",
      requiresId: true,
      requiresBody: false,
    },
    {
      method: "PUT",
      path: "/social-networks/{id}/",
      description: "Update social network",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "PATCH",
      path: "/social-networks/{id}/",
      description: "Partially update social network",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "DELETE",
      path: "/social-networks/{id}/",
      description: "Delete social network",
      requiresId: true,
      requiresBody: false,
    },
  ],
  contact: [
    { method: "GET", path: "/contact/", description: "Get all contacts", requiresId: false, requiresBody: false },
    { method: "POST", path: "/contact/", description: "Create a new contact", requiresId: false, requiresBody: true },
    { method: "GET", path: "/contact/{id}/", description: "Get contact by ID", requiresId: true, requiresBody: false },
    { method: "PUT", path: "/contact/{id}/", description: "Update contact", requiresId: true, requiresBody: true },
    {
      method: "PATCH",
      path: "/contact/{id}/",
      description: "Partially update contact",
      requiresId: true,
      requiresBody: true,
    },
    { method: "DELETE", path: "/contact/{id}/", description: "Delete contact", requiresId: true, requiresBody: false },
  ],
  content: [
    { method: "GET", path: "/content", description: "Get all content", requiresId: false, requiresBody: false },
    { method: "POST", path: "/content/", description: "Create new content", requiresId: false, requiresBody: true },
    { method: "PUT", path: "/content/", description: "Update content", requiresId: false, requiresBody: true },
    { method: "DELETE", path: "/content/", description: "Delete content", requiresId: false, requiresBody: false },
  ],
  "sector-and-department": [
    {
      method: "GET",
      path: "/sector-and-department/",
      description: "Get all sectors and departments",
      requiresId: false,
      requiresBody: false,
    },
    {
      method: "POST",
      path: "/sector-and-department/",
      description: "Create a new sector or department",
      requiresId: false,
      requiresBody: true,
    },
    {
      method: "GET",
      path: "/sector-and-department/{id}/",
      description: "Get sector or department by ID",
      requiresId: true,
      requiresBody: false,
    },
    {
      method: "PUT",
      path: "/sector-and-department/{id}/",
      description: "Update sector or department",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "PATCH",
      path: "/sector-and-department/{id}/",
      description: "Partially update sector or department",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "DELETE",
      path: "/sector-and-department/{id}/",
      description: "Delete sector or department",
      requiresId: true,
      requiresBody: false,
    },
  ],
  organization: [
    {
      method: "GET",
      path: "/organization/",
      description: "Get all organizations",
      requiresId: false,
      requiresBody: false,
    },
    {
      method: "POST",
      path: "/organization/",
      description: "Create a new organization",
      requiresId: false,
      requiresBody: true,
    },
    {
      method: "GET",
      path: "/organization/{id}/",
      description: "Get organization by ID",
      requiresId: true,
      requiresBody: false,
    },
    {
      method: "PUT",
      path: "/organization/{id}/",
      description: "Update organization",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "PATCH",
      path: "/organization/{id}/",
      description: "Partially update organization",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "DELETE",
      path: "/organization/{id}/",
      description: "Delete organization",
      requiresId: true,
      requiresBody: false,
    },
  ],
  "admin-youtube": [
    {
      method: "GET",
      path: "/admin/youtube/",
      description: "Get all YouTube videos",
      requiresId: false,
      requiresBody: false,
    },
    {
      method: "POST",
      path: "/admin/youtube/",
      description: "Create a new YouTube video",
      requiresId: false,
      requiresBody: true,
    },
    {
      method: "GET",
      path: "/admin/youtube/{id}/",
      description: "Get YouTube video by ID",
      requiresId: true,
      requiresBody: false,
    },
    {
      method: "PUT",
      path: "/admin/youtube/{id}/",
      description: "Update YouTube video",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "PATCH",
      path: "/admin/youtube/{id}/",
      description: "Partially update YouTube video",
      requiresId: true,
      requiresBody: true,
    },
    {
      method: "DELETE",
      path: "/admin/youtube/{id}/",
      description: "Delete YouTube video",
      requiresId: true,
      requiresBody: false,
    },
  ],
  auth: [
    { method: "POST", path: "/auth/login/", description: "Login to the system", requiresId: false, requiresBody: true },
    {
      method: "POST",
      path: "/auth/logout/",
      description: "Logout from the system",
      requiresId: false,
      requiresBody: false,
    },
    {
      method: "POST",
      path: "/auth/register/",
      description: "Register a new user",
      requiresId: false,
      requiresBody: true,
    },
  ],
}

// Method color mapping
const methodColors: Record<HttpMethod, string> = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-orange-500",
  PATCH: "bg-teal-500",
  DELETE: "bg-red-500",
}

export default function ApiExplorer() {
  const [activeCategory, setActiveCategory] = useState<EndpointCategory>("users")
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null)
  const [resourceId, setResourceId] = useState<string>("")
  const [requestBody, setRequestBody] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [response, setResponse] = useState<{ data: any; status: "success" | "error" | null }>({
    data: null,
    status: null,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz")
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [authToken, setAuthToken] = useState<string>("")

  // Check if user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      setAuthToken(token)
      setIsAuthenticated(true)
      apiClient.setToken(token)
    }
  }, [])

  // Filter endpoints based on search query
  const filteredEndpoints = endpoints[activeCategory].filter((endpoint) =>
    endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle language change
  const handleLanguageChange = (value: string) => {
    const lang = value as "uz" | "ru" | "en"
    setLanguage(lang)
    apiClient.setLanguage(lang)
  }

  // Handle login
  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await apiClient.auth.login(username, password)
      if (result.token) {
        localStorage.setItem("authToken", result.token)
        setAuthToken(result.token)
        setIsAuthenticated(true)
        apiClient.setToken(result.token)
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiClient.auth.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("authToken")
      setAuthToken("")
      setIsAuthenticated(false)
      apiClient.clearToken()
    }
  }

  // Execute API request
  const executeRequest = async () => {
    if (!selectedEndpoint) return

    setIsLoading(true)
    setResponse({ data: null, status: null })

    try {
      let result
      const path = selectedEndpoint.path.replace("{id}", resourceId)
      const body = requestBody ? JSON.parse(requestBody) : undefined

      // Special handling for auth endpoints
      if (path === "/auth/login/") {
        const success = await handleLogin(body.username, body.password)
        result = { success }
      } else if (path === "/auth/logout/") {
        await handleLogout()
        result = { success: true }
      } else {
        // For all other endpoints, use the generic request method
        result = await apiClient.request(path, selectedEndpoint.method, body)
      }

      setResponse({ data: result, status: "success" })
    } catch (error) {
      console.error("API request failed:", error)
      setResponse({
        data: error instanceof Error ? error.message : "Unknown error occurred",
        status: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Generate sample request body based on endpoint
  const generateSampleBody = () => {
    if (!selectedEndpoint?.requiresBody) return

    let sample = {}

    if (activeCategory === "users") {
      sample = {
        username: "johndoe",
        email: "john@example.com",
        full_name: "John Doe",
        role: "user",
      }
    } else if (activeCategory === "leadership") {
      sample = {
        title: "CEO",
        description: "Chief Executive Officer",
        position: 1,
      }
    } else if (activeCategory === "local-council") {
      sample = {
        name: "City Council",
        region: "Central",
        contact_info: "contact@citycouncil.gov",
      }
    } else if (activeCategory === "social-networks") {
      sample = {
        name: "Twitter",
        url: "https://twitter.com/example",
        icon: "twitter",
      }
    } else if (activeCategory === "contact") {
      sample = {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1234567890",
        message: "Hello, I have a question about your services.",
      }
    } else if (activeCategory === "content") {
      sample = {
        title: "Welcome to our website",
        body: "<p>This is the main content of our website.</p>",
        slug: "welcome",
        type: "page",
      }
    } else if (activeCategory === "sector-and-department") {
      sample = {
        name: "Finance",
        type: "department",
        parent_id: 123,
      }
    } else if (activeCategory === "organization") {
      sample = {
        name: "Example Organization",
        description: "This is an example organization",
        website: "https://example.org",
      }
    } else if (activeCategory === "admin-youtube") {
      sample = {
        title: "Introduction Video",
        video_id: "dQw4w9WgXcQ",
        description: "An introduction to our services",
        published_at: "2023-01-01T00:00:00Z",
      }
    } else if (activeCategory === "auth") {
      if (selectedEndpoint.path === "/auth/login/") {
        sample = {
          username: "johndoe",
          password: "your_password",
        }
      } else if (selectedEndpoint.path === "/auth/register/") {
        sample = {
          username: "newuser",
          email: "newuser@example.com",
          password: "secure_password",
          full_name: "New User",
        }
      }
    }

    setRequestBody(JSON.stringify(sample, null, 2))
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>UZFK API Explorer</CardTitle>
              <CardDescription>Explore and test all available API endpoints in one place</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uz">Uzbek</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>

              {isAuthenticated ? (
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveCategory("auth")
                    setSelectedEndpoint(endpoints.auth[0])
                    setRequestBody(
                      JSON.stringify(
                        {
                          username: "",
                          password: "",
                        },
                        null,
                        2,
                      ),
                    )
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isAuthenticated && (
            <Alert className="mb-4 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>You are authenticated. Your token will be used for all API requests.</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as EndpointCategory)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 mb-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="local-council">Local Council</TabsTrigger>
              <TabsTrigger value="social-networks">Social</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="sector-and-department">Sectors</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="admin-youtube">YouTube</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>

            {Object.keys(endpoints).map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder={`Search ${category} endpoints...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Available Endpoints</h3>
                    <div className="space-y-2">
                      {filteredEndpoints.map((endpoint, index) => (
                        <div
                          key={index}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${
                            selectedEndpoint === endpoint ? "border-primary bg-primary/5" : "hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSelectedEndpoint(endpoint)
                            setResourceId("")
                            setRequestBody("")
                            setResponse({ data: null, status: null })
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Badge className={`${methodColors[endpoint.method]} text-white`}>{endpoint.method}</Badge>
                            <span className="font-mono text-sm">{endpoint.path}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedEndpoint ? (
                      <>
                        <h3 className="text-lg font-medium">Request</h3>

                        {selectedEndpoint.requiresId && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Resource ID</label>
                            <Input
                              value={resourceId}
                              onChange={(e) => setResourceId(e.target.value)}
                              placeholder="Enter resource ID"
                            />
                          </div>
                        )}

                        {selectedEndpoint.requiresBody && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="text-sm font-medium">Request Body (JSON)</label>
                              <Button variant="outline" size="sm" onClick={generateSampleBody}>
                                Generate Sample
                              </Button>
                            </div>
                            <Textarea
                              value={requestBody}
                              onChange={(e) => setRequestBody(e.target.value)}
                              placeholder="Enter JSON request body"
                              className="font-mono h-40"
                            />
                          </div>
                        )}

                        <Button
                          onClick={executeRequest}
                          disabled={isLoading || (selectedEndpoint.requiresId && !resourceId)}
                          className="w-full"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Executing...
                            </>
                          ) : (
                            "Execute Request"
                          )}
                        </Button>

                        {response.data && (
                          <div className="space-y-2 mt-4">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium">Response</h3>
                              {response.status === "success" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : response.status === "error" ? (
                                <AlertCircle className="h-5 w-5 text-red-500" />
                              ) : null}
                            </div>
                            <div className="p-4 bg-gray-50 rounded-md overflow-auto max-h-80">
                              <pre className="text-sm font-mono whitespace-pre-wrap">
                                {typeof response.data === "string"
                                  ? response.data
                                  : JSON.stringify(response.data, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
                        <Search className="h-12 w-12 mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">No Endpoint Selected</h3>
                        <p>Select an endpoint from the list to start testing the API</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
