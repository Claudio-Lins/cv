import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "./ui/button"
import { CircleUserIcon, Home, LogOut, Settings, Settings2 } from "lucide-react"

import {
  // getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"
import { UserTypes } from "../../@types/user-types"
import Image from "next/image"

interface ProfileAvatarProps {
  user: UserTypes
}

export async function ProfileAvatar({ user }: UserTypes) {
  // const { getUser } = getKindeServerSession()
  // const user = await getUser()
  return (
    <div className=" top-10 right-10 print:hidden fixed">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {!user ? (
            <Button variant="ghost" size="icon" className="rounded-full">
              <CircleUserIcon className="w-6 h-6" />
            </Button>
          ) : (
            <div className="">
              {user?.picture ? (
                <Image
                  src={user?.picture || "https://github.com/shadcn.png"}
                  alt="Avatar image"
                  height={50}
                  width={50}
                  className="size-12 rounded-full bg-cover border"
                />
              ) : (
                user?.given_name?.split(" ").map((n) => n[0])
              )}
            </div>
            // <Avatar>
            //   <AvatarImage
            //     src={user?.picture || "https://github.com/shadcn.png"}
            //   />
            //   <AvatarFallback>
            //
            //   </AvatarFallback>
            // </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[240px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex flex-col">
              <p>{user?.given_name}</p>
              <small>{user?.email}</small>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/" className="flex w-full items-center justify-between">
              <span>Home</span>
              <Home size={18} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/admin"
              className="flex w-full items-center justify-between"
            >
              <span>Admin Settings</span>
              <Settings size={18} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <div className="flex items-center justify-between w-full">
              <LogoutLink>Logout</LogoutLink>
              <LogOut size={16} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
