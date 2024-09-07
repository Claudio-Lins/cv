"use client"

import { Loader } from "lucide-react"
import { useEffect, useState } from "react"

export default function Loading() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true)
    }
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
      <div className="relative w-32 h-36">
        <Loader size="100" className="animate-spin text-black" />
      </div>
    </main>
  )
}
