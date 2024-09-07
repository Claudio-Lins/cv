"use client"

import Image from "next/image"
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
    <main className="relative inset-0 flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950">
      <Image
        src="/LoadingBar.svg"
        width={135}
        height={140}
        alt="Loading animation"
        priority
        className="h-auto w-auto aspect-auto"
      />
    </main>
  )
}
