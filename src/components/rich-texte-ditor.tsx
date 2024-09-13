import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { FieldError } from "react-hook-form"
import "react-quill/dist/quill.snow.css"

// Carrega o ReactQuill apenas no cliente
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

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
  const [isClient, setIsClient] = useState(false)

  // Garante que o ReactQuill só será renderizado no cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Não renderiza nada no servidor
  }

  const handleChange = (content: string) => {
    onChange(content)
  }

  return (
    <div id="editor" className="w-full h-full">
      <ReactQuill
        style={{
          height: height,
          borderRadius: "5px",
          border: "1px solid #ccc",
          borderTop: "none",
          backgroundColor: "white",
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          color: "black",
          overflow: "scroll",
          position: "relative",
        }}
        value={value}
        onChange={handleChange}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
      />
      {errors?.[registerValue] && (
        <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
          {errors[registerValue]?.message}
        </span>
      )}
    </div>
  )
}
