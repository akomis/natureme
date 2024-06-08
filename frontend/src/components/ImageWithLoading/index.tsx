"use client";

import Image from "next/image";
import SanityImage from "../SanityImage";
import { useState } from "react";
import { ImageType } from "../models";
import { cn } from "@/utils";
import LoadingIndicator from "../LoadingIndicator";

type Props = {
  isSanity?: boolean;
  image: ImageType;
  className?: string;
};
const ImageWithLoading = ({ isSanity, image, className }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={(cn("image-container"), className)}>
      <div
        style={{
          height: 200,
        }}
        className={isLoading ? "skeleton" : "opacity-100"}
      >
        {isSanity ? (
          <SanityImage
            className="image m-0"
            image={image.url as object}
            alt={image.id}
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        ) : (
          <Image
            className="image m-0"
            src={image.url as string}
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
