import { cn } from "@/lib/utils"
import { Trash2Icon } from "lucide-react"

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void
}
export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center justify-center size-6 border p-1 rounded-full bg-red-600"
      )}
    >
      <Trash2Icon size={18} className="text-white" />
    </button>
  )
}
