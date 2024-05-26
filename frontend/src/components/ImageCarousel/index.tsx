"use client";

import SanityImage from "../SanityImage";
import { useState } from "react";
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
    <div className="image-container">
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
            className="image"
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

const ImageBentoGrid = ({ hash, images, isSanity }: Props) => {
  const firstColumn = images.filter((_, index) => index % 3 === 0);
  const secondColumn = images.filter((_, index) => index % 3 === 1);
  const thirdColumn = images.filter((_, index) => index % 3 === 2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[200px] overflow-y-scroll rounded-lg p-2">
      <div className="grid gap-4">
        {firstColumn.map((image: ImageType, index: number) => (
          <div key={`slide_${hash}_${index}`} id={`slide_${hash}_${index}`}>
            <ImageWithLoading image={image} isSanity={isSanity} />
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {secondColumn.map((image: ImageType, index: number) => (
          <div key={`slide_${hash}_${index}`} id={`slide_${hash}_${index}`}>
            <ImageWithLoading image={image} isSanity={isSanity} />
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {thirdColumn.map((image: ImageType, index: number) => (
          <div key={`slide_${hash}_${index}`} id={`slide_${hash}_${index}`}>
            <ImageWithLoading image={image} isSanity={isSanity} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBentoGrid;
