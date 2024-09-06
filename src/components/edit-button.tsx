import { cn } from "@/lib/utils"
import { PencilIcon } from "lucide-react"
import React from "react"

interface EditButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const EditButton = React.forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(
          "flex items-center justify-center size-6 border p-1 rounded-full bg-black",
          className
        )}
        ref={ref}
        {...props}
      >
        <PencilIcon size={18} className="text-white" />
      </button>
    )
  }
)

EditButton.displayName = "EditButton"
