import DOMPurify from "dompurify"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { EyeIcon } from "./icons/eye-icon"
import { NotePencilIcon } from "./icons/note-pencil-icon"
import { TrashIcon } from "./icons/trash-icon"

interface ResumeCardProps {
  title: string
  summary: string
  slug: string
}

export function ResumeCard({ title, summary, slug }: ResumeCardProps) {
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
          {/* <Eye className="w-6 h-6" /> */}
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
        <button
          className="text-zinc-200 hover:text-zinc-400"
          aria-label="Delete"
        >
          <TrashIcon
            width={30}
            height={30}
            fill="light"
            cor="#fcfaf6"
            className=" hover:animate-pulse hover:brightness-75"
          />
        </button>
      </div>
    </div>
  )
}
