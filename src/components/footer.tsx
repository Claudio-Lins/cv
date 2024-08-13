import { cn } from "@/lib/utils"

interface FooterProps {}

export function Footer({}: FooterProps) {
  return (
    <div
      className={cn("w-full max-w-7xl flex items-center justify-center py-10")}
    >
      {/* copyright */}
      <p className="text-xs font-thin text-gray-500">
        © {new Date().getFullYear()} My Curriculum. All rights reserved. |
        Author: Claudio lins
      </p>
    </div>
  )
}
