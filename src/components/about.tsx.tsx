"use client"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import DOMPurify from "dompurify"
import { useEffect, useState } from "react"

interface AboutProps {
  content: string
}

export function About({ content }: AboutProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>("")

  useEffect(() => {
    const cleanContent = DOMPurify.sanitize(content)
    setSanitizedContent(cleanContent)
  }, [content])

  return (
    <div className={cn("pl-10 font-light text-zinc-600 tracking-widest")}>
      <h3 className="uppercase">About</h3>
      <ScrollArea className="mt-6 pb-2 h-48 text-zinc-600 text-sm leading-relaxed text-balance whitespace-nowrap print:leading-snug print:h-full">
        <div className="flex flex-col gap-2">
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></p>
        </div>
      </ScrollArea>
    </div>
  )
}
