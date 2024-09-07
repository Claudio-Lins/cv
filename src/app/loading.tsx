"use client"

import { Loader } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
// import Loader from "../../public/LoadingBar.svg"

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
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950">
      <div className="relative w-32 h-36">
        {/* <Image
          src={Loader}
          alt="Loading animation"
          priority
          className="object-fill object-center w-20 h-24"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        /> */}
        <Loader size="100" className="animate-spin text-white" />
      </div>
    </main>
  )
}
