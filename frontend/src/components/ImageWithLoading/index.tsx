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
            className="image rounded-lg m-0"
            image={image.url as object}
            alt={image.id}
            height={undefined}
            width={undefined}
            layout="fill"
            objectFit="cover"
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        ) : (
          <Image
            className="image rounded-lg m-0"
            src={image.url as string}
            alt={image.id}
            layout="fill"
            objectFit="cover"
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageWithLoading;
