import { cn } from "@/lib/utils"

interface RoleProps {
  role: string
}

export function Role({ role }: RoleProps) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center py-6 tracking-[1rem] uppercase space-x-2"
      )}
    >
      <span className="text-2xl font-semibold">{role}</span>
    </div>
  )
}
