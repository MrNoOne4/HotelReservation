"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import { Card, CardContent } from "@/components/ui/card"

interface RoomImage {
  ImageId: number
  RoomId: number
  ImageURL: string
}

type properties = {
  images?: RoomImage[]
}




export default function CarouselWithPagination({ images }: properties) {

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto relative">
      <Carousel className="relative" setApi={setApi}>
        <CarouselContent>
          {images?.map((image) => (
            <CarouselItem key={ image.ImageId}>
              <img
                alt="dddepth-248"
                className="size-full rounded-xl object-cover"
                src={image.ImageURL.trim()}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-black h-10 w-10 absolute bg-white/50  top-1/2 left-8 -translate-x-1/2 cursor-pointer" />
        <CarouselNext className="text-black h-10 w-10 absolute  bg-white/50 top-1/2   right-1 -translate-x-1/2 cursor-pointer" />
      </Carousel>
      <div className="mt-4 flex items-center absolute  top-[90%] -translate-y-1/2 -translate-x-1/2 left-1/2  justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            className={cn("h-3.5 w-3.5 rounded-full border-2", {
              "bg-[#07070f]": current === index + 1,
            })}
            key={index}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
