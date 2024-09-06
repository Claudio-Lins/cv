"use client"

import { deleteResume } from "@/actions/resume-action"
import { cn } from "@/lib/utils"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { DeleteButton } from "./delete-button"
import { EditButton } from "./edit-button"
import { Button } from "./ui/button"

interface NavResumeProps {
  slugs: {
    title: string
    slug: string | null
  }[]
}

export function NavResume({ slugs }: NavResumeProps) {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const pathname = usePathname()
  return (
    <div className="-mt-10 bg-transparent  print:hidden">
      <NavigationMenu>
        <NavigationMenuList className="">
          {slugs.map((slug) => (
            <NavigationMenuItem
              className={cn(
                "flex items-center rounded-t-md border-t bg-white hover:bg-zinc-100",
                pathname === `/${slug.slug}` &&
                  "bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white"
              )}
              key={slug.slug}
            >
              <div className={cn("flex items-center pr-2")}>
                <Link href={`/${slug.slug}`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-b-none bg-transparent",
                      pathname === `/${slug.slug}` &&
                        "bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white"
                    )}
                  >
                    {slug.title}
                  </NavigationMenuLink>
                </Link>

                <div className="border-l pl-3 flex items-center justify-center gap-3">
                  <Link
                    href={`/admin?tab=${slug.slug}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink className="rounded-b-none bg-transparent">
                      {/* <Pencil size={14} /> */}
                      <EditButton />
                    </NavigationMenuLink>
                  </Link>
                  <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
                    <DialogTrigger asChild>
                      <DeleteButton
                        onClick={() => {
                          setIsOpenDelete(true)
                        }}
                      />
                      {/* <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setIsOpenDelete(true)
                        }}
                      >
                        <Trash2 size={18} />
                      </Button> */}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          Deletar {slug.title}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsOpenDelete(false)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          color="error"
                          onClick={() => {
                            deleteResume(slug.slug!)
                            setIsOpenDelete(false)
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

// ;<Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
//   <DialogTrigger asChild>
//     <DeleteButton
//       onClick={() => {
//         setCurrentSkill(skill)
//       }}
//     />
//   </DialogTrigger>
//   <DialogContent className="max-w-xs">
//     <DialogHeader>
//       <DialogTitle>Delete skill {currentSkill?.name}?</DialogTitle>
//     </DialogHeader>
//     <Separator />
//     <div className="flex items-center justify-between">
//       <Button
//         variant="outline"
//         onClick={() => {
//           setCurrentSkill(null)
//           setIsOpenDelete(false)
//         }}
//       >
//         Cancel
//       </Button>
//       <Button
//         variant="destructive"
//         color="error"
//         onClick={() => {
//           onDeleteSkill(currentSkill?.id!)
//           setCurrentSkill(null)
//           setIsOpenDelete(false)
//         }}
//       >
//         Delete
//       </Button>
//     </div>
//   </DialogContent>
// </Dialog>
