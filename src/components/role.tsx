import { cn } from "@/lib/utils"

interface RoleProps {
  role: string
}

export function Role({ role }: RoleProps) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center py-6 uppercase space-x-2 print:border-t print:border-b print:py-4"
      )}
    >
      <span className="text-2xl font-semibold print:text-xl tracking-[1rem] print:tracking-[0.5rem]">
        {role}
      </span>
    </div>
  )
}
