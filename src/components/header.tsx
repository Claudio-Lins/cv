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
import { CircleUserIcon, LogOut } from "lucide-react"

import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server"

interface HeaderProps {}

export async function Header({}: HeaderProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <div className={cn("w-full justify-center py-4 flex items-center")}>
      <nav className="w-full max-w-7xl flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {!user ? (
              <Button variant="ghost" size="icon" className="rounded-full">
                <CircleUserIcon className="w-6 h-6" />
              </Button>
            ) : (
              <Avatar>
                <AvatarImage
                  src={user?.picture || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {user?.given_name?.split(" ").map((n) => n[0])}{" "}
                </AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
              <div className="flex items-center justify-between w-full">
                <LogoutLink>Logout</LogoutLink>
                <LogOut size={16} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  )
}
