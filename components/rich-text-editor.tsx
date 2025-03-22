"use client"

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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { transliterate } from "@/lib/transliteration"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Введите текст..." }: RichTextEditorProps) {
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
      // When switching to translit tab, convert from Cyrillic to Latin
      const transliterated = transliterate(value, "cyrillic-to-latin")
      setTranslitValue(transliterated)
      translitEditorRef.current.innerHTML = transliterated
    }
  }, [value, activeTab])

  // Format handlers
  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const formatText = (format: string) => {
    execCommand(format)
  }

  const insertLink = () => {
    const url = prompt("Enter URL:", "https://")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:", "https://")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  const insertTable = () => {
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
      execCommand("insertHTML", table)
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

      // Convert from Latin to Cyrillic when editing in the translit tab
      const cyrillicContent = transliterate(newTranslitContent, "latin-to-cyrillic")
      onChange(cyrillicContent)

      // Don't update the transliteration editor's content here to avoid cursor jumping
    }
  }

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="main" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger
            value="main"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            ОСНОВНОЕ
          </TabsTrigger>
          <TabsTrigger
            value="translit"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            ТРАНСЛИТ
          </TabsTrigger>
        </TabsList>

        <div className="p-1 border-b flex flex-wrap gap-1">
          <div className="flex items-center border rounded-sm">
            <select
              className="h-8 px-2 text-sm focus:outline-none"
              onChange={(e) => execCommand("formatBlock", e.target.value)}
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="pre">Preformatted</option>
            </select>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button variant="ghost" size="icon" onClick={() => formatText("bold")} title="Bold">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => formatText("italic")} title="Italic">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => formatText("underline")} title="Underline">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => formatText("strikeThrough")} title="Strikethrough">
              <Strikethrough className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")} title="Align Left">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("justifyCenter")} title="Align Center">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("justifyRight")} title="Align Right">
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button variant="ghost" size="icon" onClick={() => execCommand("insertUnorderedList")} title="Bullet List">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("insertOrderedList")} title="Numbered List">
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button variant="ghost" size="icon" onClick={insertLink} title="Insert Link">
              <Link className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "blockquote")} title="Quote">
              <Quote className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={insertImage} title="Insert Image">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={insertTable} title="Insert Table">
              <Table className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded-sm">
            <Button variant="ghost" size="icon" onClick={() => execCommand("undo")} title="Undo">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("redo")} title="Redo">
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
      </Tabs>
    </div>
  )
}

