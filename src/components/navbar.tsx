"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { UserTypes } from "../../@types/user-types"
import { ProfileAvatar } from "./profile-avatar"
import { Button } from "./ui/button"
import { CircleUserIcon, Home, LogOut, Settings } from "lucide-react"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"

export const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
]

export function Navbar({ user }: UserTypes) {
  const pathname = usePathname()
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto justify-center px-4 py-5 md:px-8 grid grid-cols-12 fixed w-full z-10 print:hidden"
      )}
    >
      <div className="col-span-6 flex sm:col-span-3">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            My<span className="text-blue-600 font-light">Curriculum</span>
          </h1>
        </Link>
      </div>
      <div className="hidden sm:flex justify-center items-center col-span-6">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((navigationItem, index) => (
              <NavigationMenuItem key={index}>
                <Link href={navigationItem.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === navigationItem.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {navigationItem.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center justify-end md:col-span-3 col-span-6">
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
              <Link
                href="/"
                className="flex w-full items-center justify-between"
              >
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
    </div>
  )
}
