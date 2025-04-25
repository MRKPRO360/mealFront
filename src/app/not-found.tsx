import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: "The page you're looking for doesn't exist.",
};

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Warning } from '@/components/icons/warning';

export default function NotFound() {
  return (
    <div className="py-16 px-4 border-b container mx-auto min-h-screen flex items-center justify-center">
      <Card className="w-full ">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <Warning className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            404 Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-center">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <div className="flex justify-center">
            <Button asChild variant="default" className="mt-4">
              <Link href="/">
                <Warning className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
