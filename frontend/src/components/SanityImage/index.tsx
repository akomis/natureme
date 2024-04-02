"use client";

import { sanity } from "@/utils";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

type Props = {
  image: object;
} & Omit<React.ComponentPropsWithRef<typeof Image>, "src">;

const SanityImage = (props: Props) => {
  const logoProps = useNextSanityImage(sanity, props.image);
  return <Image {...logoProps} {...props} />;
};

export default SanityImage;
