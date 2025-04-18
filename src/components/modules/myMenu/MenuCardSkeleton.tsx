import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function MenuCardSkeleton() {
  return (
    <Card className="shadow-sm hover:shadow-md hover:scale-[1.01] transition duration-300 will-change-transform ease-out">
      <CardHeader>
        <div className="relative min-w-full h-[200px] lg:h-[250px]">
          <Skeleton className="absolute w-full h-full rounded-t-xs" />
        </div>
      </CardHeader>
      <CardContent className="pb-8">
        <CardTitle className="font-semibold">
          <Skeleton className="h-5 w-3/4" />
        </CardTitle>

        <CardDescription className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Icons section */}
          <div className="text-sm text-gray-500 flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default MenuCardSkeleton;
