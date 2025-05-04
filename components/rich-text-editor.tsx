"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Indent,
  Outdent,
  Link,
  ImageIcon,
  Code,
  Quote,
  Type,
  Palette,
  RotateCcw,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { transliterate } from "@/lib/transliteration"

interface RichTextEditorProps {
  initialContent?: string
  initialTranslitContent?: string
  showTransliteration?: boolean
  onChange?: (content: string) => void
  onTranslitChange?: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({
  initialContent = "",
  initialTranslitContent = "",
  showTransliteration = false,
  onChange,
  onTranslitChange,
  placeholder = "Start typing...",
}: RichTextEditorProps) {
  const [mainContent, setMainContent] = useState(initialContent)
  const [translitContent, setTranslitContent] = useState(initialTranslitContent)
  const [activeTab, setActiveTab] = useState<string>("main")

  const mainEditorRef = useRef<HTMLDivElement>(null)
  const translitEditorRef = useRef<HTMLDivElement>(null)

  // Only set initial content once on mount
  useEffect(() => {
    if (mainEditorRef.current && initialContent) {
      mainEditorRef.current.innerHTML = initialContent
    }
    if (translitEditorRef.current && initialTranslitContent) {
      translitEditorRef.current.innerHTML = initialTranslitContent
    }
  }, []) // Empty dependency array means this runs once on mount

  const handleMainContentChange = () => {
    if (mainEditorRef.current) {
      const content = mainEditorRef.current.innerHTML
      setMainContent(content)
      onChange?.(content)
    }
  }

  const handleTranslitContentChange = () => {
    if (translitEditorRef.current) {
      const content = translitEditorRef.current.innerHTML
      setTranslitContent(content)
      onTranslitChange?.(content)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)

    // Update content based on active tab
    if (activeTab === "main") {
      handleMainContentChange()
    } else {
      handleTranslitContentChange()
    }

    // Focus back on the active editor
    if (activeTab === "main" && mainEditorRef.current) {
      mainEditorRef.current.focus()
    } else if (activeTab === "translit" && translitEditorRef.current) {
      translitEditorRef.current.focus()
    }
  }

  const handleTranslitButtonClick = () => {
    // Determine which editor is active
    const activeEditor = activeTab === "main" ? mainEditorRef.current : translitEditorRef.current

    if (!activeEditor) return

    // Get selected text or use entire content if nothing is selected
    const selection = window.getSelection()
    let text = ""
    let range: Range | null = null

    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      // There is selected text
      range = selection.getRangeAt(0)
      const fragment = range.cloneContents()
      const tempDiv = document.createElement("div")
      tempDiv.appendChild(fragment)
      text = tempDiv.innerHTML
    } else {
      // No selection, use entire content
      text = activeEditor.innerHTML
    }

    // Transliterate the text
    const transliteratedText = transliterate(text)

    // Replace the text
    if (range && selection && !selection.isCollapsed) {
      // Replace only selected text
      range.deleteContents()
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = transliteratedText

      // Insert each child node
      while (tempDiv.firstChild) {
        range.insertNode(tempDiv.firstChild)
      }

      // Update content
      if (activeTab === "main") {
        handleMainContentChange()
      } else {
        handleTranslitContentChange()
      }
    } else {
      // Replace entire content
      activeEditor.innerHTML = transliteratedText

      // Update content
      if (activeTab === "main") {
        handleMainContentChange()
      } else {
        handleTranslitContentChange()
      }
    }
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  const clearFormatting = () => {
    execCommand("removeFormat")
  }

  const renderToolbar = () => (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
      {/* Text formatting */}
      <Button variant="ghost" size="icon" onClick={() => execCommand("bold")}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("italic")}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("underline")}>
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* Font controls */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Type className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => execCommand("fontSize", "1")}>Small</DropdownMenuItem>
          <DropdownMenuItem onClick={() => execCommand("fontSize", "3")}>Normal</DropdownMenuItem>
          <DropdownMenuItem onClick={() => execCommand("fontSize", "5")}>Large</DropdownMenuItem>
          <DropdownMenuItem onClick={() => execCommand("fontSize", "7")}>Huge</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => execCommand("foreColor", "#000000")}>Black</DropdownMenuItem>
          <DropdownMenuItem onClick={() => execCommand("foreColor", "#FF0000")}>Red</DropdownMenuItem>
          <DropdownMenuItem onClick={() => execCommand("foreColor", "#0000FF")}>Blue</DropdownMenuItem>
          <DropdownMenuItem onClick={() => execCommand("foreColor", "#008000")}>Green</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* Alignment */}
      <Button variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")}>
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("justifyCenter")}>
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("justifyRight")}>
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("justifyFull")}>
        <AlignJustify className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* Lists and indentation */}
      <Button variant="ghost" size="icon" onClick={() => execCommand("insertUnorderedList")}>
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("insertOrderedList")}>
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("indent")}>
        <Indent className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("outdent")}>
        <Outdent className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* Headings */}
      <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h1>")}>
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h2>")}>
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h3>")}>
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* Special elements */}
      <Button variant="ghost" size="icon" onClick={insertLink}>
        <Link className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={insertImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<pre>")}>
        <Code className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<blockquote>")}>
        <Quote className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* Clear formatting */}
      <Button variant="ghost" size="icon" onClick={clearFormatting}>
        <RotateCcw className="h-4 w-4" />
      </Button>

      {/* Latin ⟷ Cyrillic conversion button - Always show this button */}
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      <Button variant="outline" size="sm" onClick={handleTranslitButtonClick} className="ml-auto">
        Latin ⟷ Cyrillic
      </Button>
    </div>
  )

  return (
    <div className="border rounded-md overflow-hidden">
      {showTransliteration ? (
        <Tabs defaultValue="main" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between border-b">
            <TabsList>
              <TabsTrigger value="main">Main Content</TabsTrigger>
              <TabsTrigger value="translit">Transliteration</TabsTrigger>
            </TabsList>
          </div>

          {renderToolbar()}

          <TabsContent value="main" className="p-0">
            <div
              ref={mainEditorRef}
              contentEditable
              dir="ltr"
              style={{ direction: "ltr", unicodeBidi: "isolate" }}
              className="min-h-[200px] p-4 focus:outline-none text-left"
              onInput={handleMainContentChange}
              placeholder={placeholder}
            />
          </TabsContent>

          <TabsContent value="translit" className="p-0">
            <div
              ref={translitEditorRef}
              contentEditable
              dir="ltr"
              style={{ direction: "ltr", unicodeBidi: "isolate" }}
              className="min-h-[200px] p-4 focus:outline-none text-left"
              onInput={handleTranslitContentChange}
              placeholder={placeholder}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          {renderToolbar()}
          <div
            ref={mainEditorRef}
            contentEditable
            dir="ltr"
            style={{ direction: "ltr", unicodeBidi: "isolate" }}
            className="min-h-[200px] p-4 focus:outline-none text-left"
            onInput={handleMainContentChange}
            placeholder={placeholder}
          />
        </>
      )}
    </div>
  )
}

// Export both as named export and default export;
export default RichTextEditor
