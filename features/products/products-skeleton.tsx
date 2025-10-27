import { Skeleton } from "@/components/ui/skeleton"

export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[375px] rounded-sm bg-gray-200" />
      ))}
    </div>
  )
}
