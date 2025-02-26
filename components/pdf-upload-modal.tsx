"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface PDFUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onFileUpload: (file: File) => void
  userRole?: "student" | "teacher"
}

export function PDFUploadModal({ isOpen, onClose, onFileUpload, userRole = "student" }: PDFUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append("pdf", file)

    try {
      const response = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process PDF")
      }

      const data = await response.json()
      console.log("PDF processed successfully:", data)

      // Close the modal
      onClose()

      // Call the onFileUpload callback
      onFileUpload(file)

      if (userRole === "teacher") {
        // Redirect to the newly created module page
        router.push(`/teacher-dashboard/module/${data.moduleId}`)
      } else {
        // Redirect to the pre-made course page for students
        router.push("/courses/personality-and-brands")
      }
    } catch (error) {
      console.error("Error processing PDF:", error)
      // TODO: Show error message to user
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload PDF</DialogTitle>
        </DialogHeader>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
          <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              {file ? file.name : "Drag and drop your PDF here, or click to select"}
            </p>
          </label>
        </div>
        <Button onClick={handleUpload} disabled={!file || uploading} className="w-full mt-4">
          {uploading ? "Processing..." : "Upload and Process PDF"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

