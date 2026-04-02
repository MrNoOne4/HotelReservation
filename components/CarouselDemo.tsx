import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface RoomImage {
  ImageId: number
  RoomId: number
  ImageURL: string
}

type properties = {
  image?: RoomImage[]
}

export function CarouselDemo({ image }: properties) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {image?.map((element, index) => (
          <CarouselItem key={index}>
            <Card className="border-0 rounded-none">
              <CardContent className="p-0">
                <div className="relative w-full h-72">
                  <img
                    src={element.ImageURL}
                    alt={`Room Image ${index}`}
                    className=" w-full h-full "
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  )
}