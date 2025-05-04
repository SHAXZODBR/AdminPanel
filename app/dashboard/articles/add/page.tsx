"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store" // Import the store instead of API client

export default function AddArticlePage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [translitContent, setTranslitContent] = useState("")
  const [category, setCategory] = useState("")
  const [language, setLanguage] = useState<"en" | "ru" | "uz" | "uz-cyrl">("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { addArticle } = useStore() // Use the store context instead of API client

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Use the store's addArticle function instead of API client
      addArticle({
        title,
        content,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        category: category || "uncategorized",
        language, // Use the selected language
        author: "Current User",
        tags: [],
        image: "",
        isPublished: true,
      })

      toast({
        title: "Success",
        description: "Article created successfully",
      })

      // Reset form
      setTitle("")
      setSlug("")
      setContent("")
      setTranslitContent("")
      setCategory("")
    } catch (error) {
      console.error("Error creating article:", error)
      toast({
        title: "Error",
        description: "Failed to create article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = () => {
    if (!title) return

    // Convert title to lowercase, replace spaces with hyphens, and remove special characters
    const generatedSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")

    setSlug(generatedSlug)
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Article</CardTitle>
          <CardDescription>Create a new article for the website</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Title" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug</Label>
                <Button type="button" variant="outline" size="sm" onClick={generateSlug} disabled={!title}>
                  Generate from Title
                </Button>
              </div>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="announcements">Announcements</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={(val) => setLanguage(val as "en" | "ru" | "uz" | "uz-cyrl")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="uz">Uzbek (Latin)</SelectItem>
                    <SelectItem value="uz-cyrl">Uzbek (Cyrillic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor
                showTransliteration={language === "uz" || language === "uz-cyrl"}
                initialContent={content}
                initialTranslitContent={translitContent}
                onChange={setContent}
                onTranslitChange={setTranslitContent}
                placeholder="Write your article content here..."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating..." : "Create Article"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
