import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function SkeletonPage() {
  return (
    <main
      className={cn(
        "w-full max-w-7xl bg-zinc-50 items-center flex flex-col min-h-dvh pb-20 mt-20 p-10 print:mt-0"
      )}
    >
      <Skeleton className="h-[75px] w-[650px] rounded-xl" />
      <div className="mt-20 flex flex-col items-center justify-center gap-5">
        <Skeleton className="h-[2px] w-[1200px] rounded-xl" />
        <Skeleton className="h-[55px] w-[650px] rounded-xl" />
        <Skeleton className="h-[2px] w-[1200px] rounded-xl" />
      </div>
      <div className="flex w-full gap-4 mt-10">
        <Skeleton className="h-[250px] w-1/4 rounded-xl" />
        <Skeleton className="h-[250px] w-3/4 rounded-xl" />
      </div>
      <div className="flex w-full gap-4 mt-10">
        <Skeleton className="h-[2px] w-1/4 rounded-xl" />
        <Skeleton className="h-[2px] w-3/4 rounded-xl" />
      </div>
      <div className="flex w-full gap-4 mt-10">
        <Skeleton className="h-[550px] w-1/4 rounded-xl" />
        <Skeleton className="h-[550px] w-3/4 rounded-xl" />
      </div>
      <div className="flex w-full gap-4 mt-10">
        <Skeleton className="h-[2px] w-1/4 rounded-xl" />
        <Skeleton className="h-[2px] w-3/4 rounded-xl" />
      </div>
    </main>
  )
}
