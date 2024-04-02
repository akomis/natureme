"use client";

import { cn } from "@/utils";
import SanityImage from "../SanityImage";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

const ImageCarousel = ({ items }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = items.length - 1;

  useInterval(() => {
    const nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;

    document.getElementById(`button${nextIndex}`)?.click();
    setActiveIndex(nextIndex);
  }, 3000);

  return (
    <div className="flex flex-col gap-2 rounded-lg w-full">
      <div className="carousel max-h-[300px] gap-4 w-full rounded-lg overflow-hidden">
        {items.map((item: any, index: number) => (
          <div
            key={`slide${index}`}
            id={`slide${index}`}
            className="carousel-item w-full"
          >
            <div className="image-container">
              <SanityImage
                className="image"
                image={item}
                alt={"activity image"}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full gap-2">
        {items.map((_: any, index: number) => (
          <a
            key={`button${index}`}
            id={`button${index}`}
            href={`#slide${index}`}
            className={cn(
              "bg-base-100 hover:bg-base-300 rounded-lg h-2 w-10 transition-all",
              { "bg-base-300": index === activeIndex }
            )}
          ></a>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
