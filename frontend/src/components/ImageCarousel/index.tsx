"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ImageType } from "../models";
import ImageWithLoading from "../ImageWithLoading";

type Props = {
  images: ImageType[];
  isSanity?: boolean;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ImageCarousel = ({ images, isSanity }: Props) => {
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      responsive={responsive}
      ssr={false}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      transitionDuration={500}
      centerMode
      containerClass="rounded-lg h-[150px]"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="mr-1"
    >
      {images.map((image) => (
        <div key={image.id}>
          <ImageWithLoading image={image} isSanity={isSanity} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
