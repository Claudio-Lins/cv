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
    <div
      className={cn(
        " font-light text-zinc-600 tracking-widest print:border-b print:pb-0"
      )}
    >
      <h3 className="uppercase print:text-sm">About</h3>
      <ScrollArea className="mt-6 pb-2 h-48 text-zinc-600 text-sm leading-relaxed text-balance whitespace-nowrap print:leading-relaxed print:h-full print:mt-2">
        <div className="flex flex-col gap-2 ">
          <p
            className="print:text-[10px] print:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></p>
        </div>
      </ScrollArea>
    </div>
  )
}
