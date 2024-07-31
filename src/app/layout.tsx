import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
import { UserTypes } from "../../@types/user-types"
import { ProfileAvatar } from "@/components/profile-avatar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

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
          "bg-purple-100 w-full flex items-center flex-col min-h-dvh mt-20"
        )}
      >
        {/* <Navbar user={user} /> */}
        <ProfileAvatar user={user} />
        {children}
      </body>
    </html>
  )
}
