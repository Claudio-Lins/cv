import DOMPurify from "dompurify"
import { Edit, Eye, Trash2 } from "lucide-react"

interface ResumeCardProps {
  title: string
  summary: string
}

export function ResumeCard({ title, summary }: ResumeCardProps) {
  return (
    <div className="shadow-lg rounded-lg  w-96 overflow-hidden flex flex-col">
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-900 p-4 text-white">
        <h2 className="text-xl font-bold text-center line-clamp-1">{title}</h2>
      </div>
      <div className="p-4 flex-grow flex items-center justify-center">
        {/* <p className="text-sm text-gray-600 text-center line-clamp-4">
          {summary}
        </p> */}
        <div
          className="text-sm text-gray-600 text-center line-clamp-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize ? DOMPurify.sanitize(summary) : summary,
          }}
        />
      </div>
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-900  px-4 py-3 flex justify-center space-x-10">
        <button className="text-zinc-200 hover:text-zinc-400" aria-label="View">
          <Eye className="w-6 h-6" />
        </button>
        <button className="text-zinc-200 hover:text-zinc-400" aria-label="Edit">
          <Edit className="w-6 h-6" />
        </button>
        <button
          className="text-zinc-200 hover:text-zinc-400"
          aria-label="Delete"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
