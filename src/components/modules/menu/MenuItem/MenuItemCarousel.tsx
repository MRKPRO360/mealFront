import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { IMenuName } from '@/types';

export async function MenuItemCarousel({
  menuNames,
}: {
  menuNames: IMenuName[];
}) {
  return (
    <Carousel className=" md:w-full">
      <CarouselContent className="-ml-1">
        {menuNames?.map((item: IMenuName) => (
          <CarouselItem
            key={item._id}
            className="pl-1 sm:basis-1/2 lg:basis-1/4"
          >
            <div className="p-1">
              <Card
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%), url(${item.menuImg})`,

                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
                className=""
              >
                <CardContent className="flex flex-col justify-end aspect-square px-6 pb-8 text-white gap-2 w-full h-full">
                  <CardHeader className="text-3xl font-semibold">
                    {item.name}
                  </CardHeader>
                  <CardTitle>For a healthy life</CardTitle>
                  <CardDescription className="bg-lime-500 font-semibold text-white text-lg px-2 rounded-sm">
                    Easy to eat and digest
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
