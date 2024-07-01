import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FC } from "react";
import feedBack01 from "@/public/assets/feedback1.png";
import feedBack02 from "@/public/assets/feedback2.jpg";
import feedBack03 from "@/public/assets/feedback3.jpg";
import { feedbackData } from "@/data";

export const FeedBackCard: FC = () => {
  const feedBackImages = [feedBack01, feedBack02, feedBack03];
  return (
    <Carousel className="w-full max-w-[80%] select-none">
      <CarouselContent>
        {feedbackData.map(({ name, description, who }, index) => (
          <CarouselItem key={index}>
            <div className="flex w-full text-muted-foreground items-center justify-center p-6 flex-col space-y-8">
              <p className=" text-center">{description}</p>

              <div className="flex items-center space-x-4">
                <Image
                  src={feedBackImages[index]}
                  alt="f1"
                  className=" w-16 rounded-full aspect-square object-cover object-center"
                />
                <div className="">
                  <h1 className=" text-2xl font-bold text-foreground/70">
                    {name}
                  </h1>
                  <p className=" text-xs">{who}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
