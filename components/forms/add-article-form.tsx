"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ImageUpload } from "@/components/image-upload"
import { useStore } from "@/lib/store"

export function AddArticleForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { categories, tags, addArticle } = useStore()

  const [title, setTitle] = useState("")
  const [translitTitle, setTranslitTitle] = useState("")
  const [content, setContent] = useState("")
  const [translitContent, setTranslitContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [image, setImage] = useState<string | null>(null)
  const [language, setLanguage] = useState("uz")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create the article using the store context
      await addArticle({
        title,
        translitTitle,
        content,
        translitContent,
        categoryId: Number.parseInt(categoryId),
        tagIds: selectedTags.map((id) => Number.parseInt(id)),
        image: image || "",
        language,
      })

      toast({
        title: "Success",
        description: "Article created successfully",
      })

      router.push("/dashboard/articles")
    } catch (error) {
      console.error("Error creating article:", error)
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  // Always show transliteration for Uzbek language
  const showTransliteration = language === "uz"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      {showTransliteration && (
        <div className="space-y-2">
          <Label htmlFor="translitTitle">Transliterated Title</Label>
          <Input id="translitTitle" value={translitTitle} onChange={(e) => setTranslitTitle(e.target.value)} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uz">Uzbek</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag.id}
              type="button"
              variant={selectedTags.includes(tag.id.toString()) ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagToggle(tag.id.toString())}
            >
              {tag.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <RichTextEditor
          initialContent={content}
          initialTranslitContent={translitContent}
          showTransliteration={showTransliteration}
          onChange={setContent}
          onTranslitChange={setTranslitContent}
        />
      </div>

      <div className="space-y-2">
        <Label>Featured Image</Label>
        <ImageUpload value={image} onChange={setImage} maxSize={5} maxWidth={1920} maxHeight={1080} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Article"}
      </Button>
    </form>
  )
}
