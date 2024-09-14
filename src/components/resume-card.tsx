"use client"

import { deleteResume } from "@/actions/resume-action"
import { Button } from "@/components/ui/button"
import DOMPurify from "dompurify"
import Link from "next/link"
import { useState } from "react"
import type { ResumeTypes } from "../../@types/resume-types"
import { UpdateResumeForm } from "./forms/update-resume-form"
import { UpdateResumeForm2 } from "./forms/update-resume-form2"
import { EyeIcon } from "./icons/eye-icon"
import { NotePencilIcon } from "./icons/note-pencil-icon"
import { TrashIcon } from "./icons/trash-icon"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"

interface ResumeCardProps {
  resume: ResumeTypes
  slug: string
  title: string
  about: string
}

export function ResumeCard({ resume, slug, title, about }: ResumeCardProps) {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [currentSlug, setCurrentSlug] = useState<{
    title: string
    slug: string
  } | null>(null)
  return (
    <div className="rounded-lg  w-96 h-64 overflow-hidden flex flex-col hover:scale-105 transition-all duration-500 hover:shadow-lg">
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-900 p-4 text-white">
        <h2 className="text-xl font-bold text-center line-clamp-1">
          {resume.title}
        </h2>
      </div>
      <div className="p-4 flex-grow flex items-center justify-center border">
        <div
          className="text-sm text-gray-600 text-center line-clamp-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize
              ? DOMPurify.sanitize(resume.about)
              : resume.about,
          }}
        />
      </div>
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-900  px-4 py-3 flex justify-center space-x-10">
        <Link
          href={`/${resume?.slug}`}
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

        <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setIsOpenEdit(true)
              }}
            >
              <NotePencilIcon
                width={30}
                height={30}
                fill="light"
                cor="#fcfaf6"
                className=" hover:animate-pulse hover:brightness-75"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-none md:w-[60%] px-4 overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-4xl">{resume.title}</DialogTitle>
            </DialogHeader>
            <ScrollArea
              className="w-full rounded-md border p-4"
              style={{
                height: "80vh",
                maxHeight: "95vh",
              }}
            >
              <UpdateResumeForm2
                title={resume.title!}
                slug={resume.slug!}
                firstName={resume.firstName}
                lastName={resume.lastName}
                email={resume.email}
                phone={resume.phone}
                birthday={resume.birthday ?? undefined}
                about={resume.about}
                street={resume.street}
                city={resume.city}
                state={resume.state}
                country={resume.country}
                zip={resume.zip}
                socialNetworks={resume.socialNetworks ?? []}
                workExperiences={resume.workExperiences ?? []}
                skills={resume.skills ?? []}
                educations={resume.educations ?? []}
                references={resume.references ?? []}
                resume={resume}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>

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
