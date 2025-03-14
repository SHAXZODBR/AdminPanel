"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EditDialogProps {
  title: string
  fields: {
    name: string
    label: string
    value: string
  }[]
  onSave: (values: Record<string, string>) => void
}

export function EditDialog({ title, fields, onSave }: EditDialogProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {}
    fields.forEach((field) => {
      initialValues[field.name] = field.value
    })
    return initialValues
  })

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate save operation
    setTimeout(() => {
      onSave(values)
      setIsSaving(false)
      setOpen(false)

      toast({
        title: "Saved successfully",
        description: `${title} has been updated.`,
      })
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4 text-amber-500" />
      </Button>
      <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle>
            {t("edit")} {title}
          </DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Make changes to the {title.toLowerCase()} here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.name} className="grid grid-cols-4 items-center gap-4">
              <label htmlFor={field.name} className="text-right text-sm font-medium">
                {field.label}
              </label>
              <Input
                id={field.name}
                value={values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="col-span-3 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSaving}
            className="dark:border-gray-600 dark:text-white"
          >
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

