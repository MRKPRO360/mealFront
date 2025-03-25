import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function PlanCardSkeleton() {
  return (
    <Card className="shadow-sm hover:shadow-md transition duration-300 will-change-transform ease-out">
      <CardHeader>
        <div className="relative min-w-full h-[250px] lg:h-[300px]">
          <Skeleton className="w-full h-full rounded-t-xs" />
        </div>
      </CardHeader>
      <CardContent className="pb-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />

        {/* Icons for Time & Difficulty */}
        <div className="text-sm flex justify-between items-center mt-4">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
}
