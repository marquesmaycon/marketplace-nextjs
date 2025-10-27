import { Skeleton } from "@/components/ui/skeleton"

export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 16 }).map((_, index) => (
        <Skeleton key={index} className="h-[375px] rounded-sm bg-gray-200" />
      ))}
    </div>
  )
}
