import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs bg-[#171717]">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-[#212121]" />
        <Skeleton className="h-4 w-1/2 bg-[#212121]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-[#212121]" />
      </CardContent>
    </Card>
  )
}
