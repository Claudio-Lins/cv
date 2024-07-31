"use client"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavResumeProps {
  slugs: {
    title: string
    slug: string | null
  }[]
}

export function NavResume({ slugs }: NavResumeProps) {
  const pathname = usePathname()
  return (
    <div className="ml-4 print:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          {slugs.map((slug) => (
            <NavigationMenuItem key={slug.slug}>
              <Link href={`/${slug.slug}`} legacyBehavior passHref>
                <NavigationMenuLink
                  // active={pathname.includes(`${slug.slug}`)}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-b-none",
                    pathname.includes(`${slug.slug}`) &&
                      "bg-zinc-800 text-white"
                  )}
                >
                  {slug.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
