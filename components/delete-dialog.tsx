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
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DeleteDialogProps {
  itemName: string
  onDelete: () => void
}

export function DeleteDialog({ itemName, onDelete }: DeleteDialogProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate delete operation
    setTimeout(() => {
      onDelete()
      setIsDeleting(false)
      setOpen(false)

      toast({
        title: "Deleted successfully",
        description: `${itemName} has been deleted.`,
      })
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
      <DialogContent className="bg-dashboard-accent border-dashboard-border">
        <DialogHeader>
          <DialogTitle className="text-dashboard-foreground">{t("delete")}</DialogTitle>
          <DialogDescription className="text-dashboard-foreground opacity-70">{t("deleteConfirm")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="border-dashboard-border text-dashboard-foreground bg-dashboard-muted"
          >
            {t("cancel")}
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

