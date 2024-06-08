"use client";

import { sanity } from "@/utils";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

type Props = {
  image: object;
  alt: string;
} & Omit<React.ComponentPropsWithRef<typeof Image>, "src">;

const SanityImage = (props: Props) => {
  const sanityImageProps = useNextSanityImage(sanity, props.image);
  return <Image {...sanityImageProps} {...props} alt={props.alt} />;
};

export default SanityImage;
