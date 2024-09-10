"use client"

import { deleteResume } from "@/actions/resume-action"
import { Button } from "@/components/ui/button"
import DOMPurify from "dompurify"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { EyeIcon } from "./icons/eye-icon"
import { NotePencilIcon } from "./icons/note-pencil-icon"
import { TrashIcon } from "./icons/trash-icon"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface ResumeCardProps {
  title: string
  summary: string
  slug: string
}

export function ResumeCard({ title, summary, slug }: ResumeCardProps) {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [currentSlug, setCurrentSlug] = useState<{
    title: string
    slug: string
  } | null>(null)
  return (
    <div className="rounded-lg  w-96 h-64 overflow-hidden flex flex-col hover:scale-105 transition-all duration-500 hover:shadow-lg">
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-900 p-4 text-white">
        <h2 className="text-xl font-bold text-center line-clamp-1">{title}</h2>
      </div>
      <div className="p-4 flex-grow flex items-center justify-center border">
        <div
          className="text-sm text-gray-600 text-center line-clamp-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize ? DOMPurify.sanitize(summary) : summary,
          }}
        />
      </div>
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-900  px-4 py-3 flex justify-center space-x-10">
        <Link
          href={`/${slug}`}
          className="text-zinc-200 hover:text-zinc-400"
          aria-label="View"
        >
          <EyeIcon
            width={32}
            height={32}
            fill="light"
            cor="#fcfaf6"
            className=" hover:animate-pulse hover:brightness-75"
          />
        </Link>
        <Link
          href={`/admin?tab=${slug}`}
          passHref
          className="text-zinc-200 hover:text-zinc-400"
          aria-label="Edit"
        >
          <NotePencilIcon
            width={30}
            height={30}
            fill="light"
            cor="#fcfaf6"
            className=" hover:animate-pulse hover:brightness-75"
          />
        </Link>

        <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setCurrentSlug({ slug, title })
                setIsOpenDelete(true)
              }}
            >
              <TrashIcon
                width={30}
                height={30}
                fill="light"
                cor="#fcfaf6"
                className=" hover:animate-pulse hover:brightness-75"
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                Delete {currentSlug?.title}?
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
                  deleteResume(currentSlug?.slug!)
                  setCurrentSlug({ slug, title })
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
  )
}
