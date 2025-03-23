"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Table,
  Quote,
  Undo,
  Redo,
  Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { transliterate } from "@/lib/transliteration"
import { useLanguage } from "@/components/language-provider"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Введите текст..." }: RichTextEditorProps) {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("main")
  const [translitValue, setTranslitValue] = useState("")
  const editorRef = useRef<HTMLDivElement>(null)
  const translitEditorRef = useRef<HTMLDivElement>(null)
  const [isInitialRender, setIsInitialRender] = useState(true)

  // Initialize editor content
  useEffect(() => {
    if (isInitialRender && editorRef.current) {
      editorRef.current.innerHTML = value
      setIsInitialRender(false)
    }
  }, [value, isInitialRender])

  // Update transliteration when value changes or tab changes
  useEffect(() => {
    if (activeTab === "translit" && translitEditorRef.current) {
      let transliterated = value

      // Determine which transliteration to use based on the current language
      if (language === "uz_latn") {
        // Convert from Latin to Cyrillic
        transliterated = transliterate(value, "latin-to-cyrillic")
      } else if (language === "uz_cyrl") {
        // Convert from Cyrillic to Latin
        transliterated = transliterate(value, "cyrillic-to-latin")
      }

      setTranslitValue(transliterated)
      translitEditorRef.current.innerHTML = transliterated
    }
  }, [value, activeTab, language])

  // Format handlers - PREVENT DEFAULT to avoid form submission
  const execCommand = (e: React.MouseEvent, command: string, value = "") => {
    e.preventDefault()
    e.stopPropagation()

    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const formatText = (e: React.MouseEvent, format: string) => {
    e.preventDefault()
    e.stopPropagation()
    execCommand(e, format)
  }

  const insertLink = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const url = prompt("Enter URL:", "https://")
    if (url) {
      execCommand(e, "createLink", url)
    }
  }

  const insertImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const url = prompt("Enter image URL:", "https://")
    if (url) {
      execCommand(e, "insertImage", url)
    }
  }

  const insertTable = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const rows = prompt("Number of rows:", "3")
    const cols = prompt("Number of columns:", "3")

    if (rows && cols) {
      let table = "<table border='1' style='width:100%;border-collapse:collapse;'>"
      for (let i = 0; i < Number.parseInt(rows); i++) {
        table += "<tr>"
        for (let j = 0; j < Number.parseInt(cols); j++) {
          table += "<td style='padding:8px;'>Cell</td>"
        }
        table += "</tr>"
      }
      table += "</table>"
      execCommand(e, "insertHTML", table)
    }
  }

  const handleFormatBlock = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    document.execCommand("formatBlock", false, e.target.value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleMainEditorInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      onChange(newContent)
    }
  }

  const handleTranslitEditorInput = () => {
    if (translitEditorRef.current) {
      const newTranslitContent = translitEditorRef.current.innerHTML
      setTranslitValue(newTranslitContent)

      // Convert back to the original language format
      let originalContent = newTranslitContent

      if (language === "uz_latn") {
        // Convert from Cyrillic back to Latin
        originalContent = transliterate(newTranslitContent, "cyrillic-to-latin")
      } else if (language === "uz_cyrl") {
        // Convert from Latin back to Cyrillic
        originalContent = transliterate(newTranslitContent, "latin-to-cyrillic")
      }

      onChange(originalContent)
    }
  }

  const handleTranslitButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Determine which editor is currently active
    const activeEditor = activeTab === "main" ? editorRef.current : translitEditorRef.current

    if (activeEditor) {
      const selection = window.getSelection()

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const selectedText = range.toString()

        if (selectedText) {
          // Transliterate the selected text
          let transliteratedText = selectedText

          if (language === "uz_latn") {
            // Convert from Latin to Cyrillic
            transliteratedText = transliterate(selectedText, "latin-to-cyrillic")
          } else if (language === "uz_cyrl") {
            // Convert from Cyrillic to Latin
            transliteratedText = transliterate(selectedText, "cyrillic-to-latin")
          }

          // Replace the selected text with the transliterated text
          range.deleteContents()
          range.insertNode(document.createTextNode(transliteratedText))

          // Update the editor content
          if (activeTab === "main") {
            onChange(editorRef.current?.innerHTML || "")
          } else {
            handleTranslitEditorInput()
          }
        } else {
          // If no text is selected, transliterate the entire content
          const currentContent = activeEditor.innerHTML
          const textContent = activeEditor.textContent || ""

          // Extract HTML tags and their positions
          const htmlTags: { tag: string; position: number }[] = []
          const tagRegex = /<[^>]+>/g
          let match

          while ((match = tagRegex.exec(currentContent)) !== null) {
            htmlTags.push({
              tag: match[0],
              position: match.index,
            })
          }

          // Transliterate the text content
          let transliteratedText = textContent

          if (language === "uz_latn") {
            // Convert from Latin to Cyrillic
            transliteratedText = transliterate(textContent, "latin-to-cyrillic")
          } else if (language === "uz_cyrl") {
            // Convert from Cyrillic to Latin
            transliteratedText = transliterate(textContent, "cyrillic-to-latin")
          }

          // Reinsert HTML tags at their original positions
          let result = transliteratedText
          for (let i = htmlTags.length - 1; i >= 0; i--) {
            const tag = htmlTags[i]
            result = result.slice(0, tag.position) + tag.tag + result.slice(tag.position)
          }

          activeEditor.innerHTML = result

          // Update the state based on which editor was modified
          if (activeTab === "main") {
            onChange(result)
          } else {
            setTranslitValue(result)
            handleTranslitEditorInput()
          }
        }
      }
    }
  }

  // Only show the transliteration tab for Uzbek languages
  const showTranslitTab = language === "uz_latn" || language === "uz_cyrl"

  // Label for transliteration button based on language
  const translitButtonLabel =
    language === "uz_latn"
      ? "Kirill alifbosiga o'tkazish"
      : language === "uz_cyrl"
        ? "Lotin alifbosiga o'tkazish"
        : "Translit"

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="main" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b p-2">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="main"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {language === "ru" ? "ОСНОВНОЕ" : language === "uz_latn" ? "ASOSIY" : "АСОСИЙ"}
            </TabsTrigger>
            {showTranslitTab && (
              <TabsTrigger
                value="translit"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {language === "uz_latn" ? "TRANSLIT" : "ТРАНСЛИТ"}
              </TabsTrigger>
            )}
          </TabsList>

          {showTranslitTab && (
            <Button
              type="button"
              variant="default"
              onClick={handleTranslitButtonClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {translitButtonLabel}
            </Button>
          )}
        </div>

        <div className="p-1 border-b flex flex-wrap gap-1">
          <div className="flex items-center border rounded-sm">
            <select className="h-8 px-2 text-sm focus:outline-none" onChange={handleFormatBlock}>
              <option value="p">{t("paragraph")}</option>
              <option value="h1">{t("heading")} 1</option>
              <option value="h2">{t("heading")} 2</option>
              <option value="h3">{t("heading")} 3</option>
              <option value="h4">{t("heading")} 4</option>
              <option value="pre">{t("preformatted")}</option>
            </select>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button type="button" variant="ghost" size="icon" onClick={(e) => formatText(e, "bold")} title={t("bold")}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => formatText(e, "italic")}
              title={t("italic")}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => formatText(e, "underline")}
              title={t("underline")}
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => formatText(e, "strikeThrough")}
              title={t("strikethrough")}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => execCommand(e, "justifyLeft")}
              title={t("alignLeft")}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => execCommand(e, "justifyCenter")}
              title={t("alignCenter")}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => execCommand(e, "justifyRight")}
              title={t("alignRight")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => execCommand(e, "insertUnorderedList")}
              title={t("bulletList")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => execCommand(e, "insertOrderedList")}
              title={t("numberedList")}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button type="button" variant="ghost" size="icon" onClick={insertLink} title={t("insertLink")}>
              <Link className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => execCommand(e, "formatBlock", "blockquote")}
              title={t("quote")}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={insertImage} title={t("insertImage")}>
              <Image className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={insertTable} title={t("insertTable")}>
              <Table className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button type="button" variant="ghost" size="icon" onClick={(e) => execCommand(e, "undo")} title={t("undo")}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={(e) => execCommand(e, "redo")} title={t("redo")}>
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="main" className="mt-0">
          <div
            ref={editorRef}
            className="min-h-[300px] p-4 focus:outline-none"
            contentEditable
            onInput={handleMainEditorInput}
            placeholder={placeholder}
            suppressContentEditableWarning={true}
          />
        </TabsContent>

        {showTranslitTab && (
          <TabsContent value="translit" className="mt-0">
            <div
              ref={translitEditorRef}
              className="min-h-[300px] p-4 focus:outline-none"
              contentEditable
              onInput={handleTranslitEditorInput}
              placeholder={placeholder}
              suppressContentEditableWarning={true}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

