import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import { ProfileAvatar } from "@/components/profile-avatar"

import { getAllResume } from "@/data/resume"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MyResume",
  description: "Create any new resume with MyResume",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const slug = await getAllResume(user?.id!)

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=/api/auth/creation"
    )
  }
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-purple-100 w-full flex items-center flex-col min-h-dvh mt-20 print:mt-0"
        )}
      >
        <ProfileAvatar slug={slug} />
        {children}
      </body>
    </html>
  )
}
