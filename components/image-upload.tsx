"use client"

import { useState, useRef, type ChangeEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Upload } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void
  initialImages?: string[]
  multiple?: boolean
}

export function ImageUpload({ onImagesSelected, initialImages = [], multiple = true }: ImageUploadProps) {
  const { t, language } = useLanguage()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialImages)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return

    const files = Array.from(event.target.files)

    // If multiple is false, only keep the last selected file
    const newFiles = multiple ? [...selectedFiles, ...files] : files

    setSelectedFiles(newFiles)

    // Create preview URLs for new files
    const newPreviewUrls = multiple ? [...previewUrls] : [] // Clear previews if multiple is false

    files.forEach((file) => {
      const url = URL.createObjectURL(file)
      newPreviewUrls.push(url)
    })

    setPreviewUrls(newPreviewUrls)
    onImagesSelected(newFiles)
  }

  const handleRemoveFile = (index: number) => {
    const newSelectedFiles = [...selectedFiles]
    const newPreviewUrls = [...previewUrls]

    // If the index is for an initial image
    if (index >= selectedFiles.length) {
      newPreviewUrls.splice(index, 1)
    } else {
      URL.revokeObjectURL(newPreviewUrls[index])
      newSelectedFiles.splice(index, 1)
      newPreviewUrls.splice(index, 1)
    }

    setSelectedFiles(newSelectedFiles)
    setPreviewUrls(newPreviewUrls)
    onImagesSelected(newSelectedFiles)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  // Determine upload button text
  const uploadText =
    language === "uz_latn" ? "Rasmlarni yuklash" : language === "uz_cyrl" ? "Расмларни юклаш" : "Загрузить изображения"

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-primary"
        onClick={handleButtonClick}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">{uploadText}</p>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF {t("up_to")} 10MB</p>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button type="button" variant="outline" className="mt-4" onClick={handleButtonClick}>
          {t("choose_files")}
        </Button>
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-md border">
                <Image src={url || "/placeholder.svg"} alt={`Preview ${index + 1}`} fill className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-80 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

