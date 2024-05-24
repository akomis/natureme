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

type ImageWithLoadingProps = {
  isSanity?: boolean;
  image: ImageType;
};
const ImageWithLoading = ({ isSanity, image }: ImageWithLoadingProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="image-container max-h-56">
      {isLoading && <div className="skeleton h-full opacity-75"></div>}
      <div className={isLoading ? "opacity-0" : "opacity-100"}>
        {isSanity ? (
          <SanityImage
            className="image"
            image={image.url}
            alt={image.id}
            onLoadingComplete={() => {
              setIsLoading(false);
            }}
          />
        ) : (
          <Image
            className="image max-h-56"
            src={image.url}
            alt={image.id}
            fill
            onLoadingComplete={() => {
              setIsLoading(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

const ImageCarousel = ({ hash, images, isSanity }: Props) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const lastIndex = images.length - 1;

  // useInterval(() => {
  //   const nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;

  //   document.getElementById(`button_${hash}_${nextIndex}`)?.click();
  //   setActiveIndex(nextIndex);
  // }, 5000);

  return (
    <div className="flex flex-col gap-2">
      <div className="carousel max-h-[250px] gap-4 overflow-hidden">
        {images.map((image: ImageType, index: number) => (
          <div
            key={`slide_${hash}_${index}`}
            id={`slide_${hash}_${index}`}
            className="w-48"
          >
            <ImageWithLoading image={image} isSanity={isSanity} />
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center gap-2">
        {images.map((_: ImageType, index: number) => (
          <a
            key={`button_${hash}_${index}`}
            id={`button_${hash}_${index}`}
            href={`#slide_${hash}_${index}`}
            className={cn(
              "bg-white hover:bg-pink-400 rounded-lg h-2 w-10 transition-all",
              { "bg-pink-300": index === activeIndex }
            )}
            onClick={() => {
              setActiveIndex(index);
            }}
          ></a>
        ))}
      </div> */}
    </div>
  );
};

export default ImageCarousel;
