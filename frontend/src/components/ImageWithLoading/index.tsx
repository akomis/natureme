"use client";

import Image from "next/image";
import SanityImage from "../SanityImage";
import { useState } from "react";
import { ImageType } from "../models";
import { cn } from "@/utils";

type Props = {
  isSanity?: boolean;
  image: ImageType;
  className?: string;
};
const ImageWithLoading = ({ isSanity, image, className }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={(cn("image-container"), className)}>
      {isLoading && <div className="skeleton h-full w-full opacity-75"></div>}
      <div className={isLoading ? "opacity-0" : "opacity-100"}>
        {isSanity ? (
          <SanityImage
            className="image"
            image={image.url}
            alt={image.id}
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        ) : (
          <Image
            className="image"
            src={image.url}
            alt={image.id}
            fill
            onLoad={() => {
              setIsLoading(false);
            }}
            unoptimized
          />
        )}
      </div>
    </div>
  );
};

export default ImageWithLoading;
