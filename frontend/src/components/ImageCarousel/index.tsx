"use client";

import { cn } from "@/utils";
import SanityImage from "../SanityImage";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import Image from "next/image";

type ImageType = { id: string; url: string };

type Props = {
  hash: string;
  images: ImageType[];
  isSanity?: boolean;
};

const ImageCarousel = ({ hash, images, isSanity }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = images.length - 1;

  useInterval(() => {
    const nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;

    document.getElementById(`button_${hash}_${nextIndex}`)?.click();
    setActiveIndex(nextIndex);
  }, 5000);

  return (
    <div className="flex flex-col gap-2 rounded-lg w-full">
      <div className="carousel max-h-[300px] gap-4 w-full rounded-lg overflow-hidden">
        {images.map((image: ImageType, index: number) => (
          <div
            key={`slide_${hash}_${index}`}
            id={`slide_${hash}_${index}`}
            className="carousel-item w-full"
          >
            <div className="image-container">
              {isSanity ? (
                <SanityImage
                  className="image"
                  image={image.url}
                  alt={image.id}
                />
              ) : (
                <Image className="image" src={image.url} alt={image.id} fill />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full gap-2">
        {images.map((image: ImageType, index: number) => (
          <a
            key={`button_${hash}_${index}`}
            id={`button_${hash}_${index}`}
            href={`#slide_${hash}_${index}`}
            className={cn(
              "bg-pink-100 hover:bg-pink-400 rounded-lg h-2 w-10 transition-all",
              { "bg-pink-300": index === activeIndex }
            )}
            onClick={() => {
              setActiveIndex(index);
            }}
          ></a>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
