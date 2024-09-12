import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { FieldError, UseFormRegister } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useQuill } from "react-quilljs" // Ensure this is imported correctly

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  height?: number | string
  errors?: Record<string, FieldError>
  registerValue: string
}

export function RichTextEditor({
  value,
  onChange,
  height = "100%",
  errors,
  registerValue,
}: RichTextEditorProps) {
  const { quill, quillRef } = useQuill() // Use the hook to get quill instance

  const handleChange = (content: string) => {
    onChange(content)
  }

  return (
    <div className="w-full h-full">
      <ReactQuill
        style={{
          height: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
          borderTop: "none",
          backgroundColor: "white",
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          color: "black",
        }}
        value={value}
        onChange={handleChange}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            // ["link"],
            // ["clean"],
          ],
        }}
      />
      <div ref={quillRef} style={{ height: "100%", display: "none" }} />
      {errors?.[registerValue] && (
        <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
          {errors[registerValue]?.message}
        </span>
      )}
    </div>
  )
}
