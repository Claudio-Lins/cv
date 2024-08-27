import { cn } from "@/lib/utils"
import { PencilIcon, Trash2Icon } from "lucide-react"

interface EditButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void
}

export function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center justify-center size-6 border p-1 rounded-full bg-black"
      )}
    >
      <PencilIcon size={18} className="text-white" />
    </button>
  )
}
