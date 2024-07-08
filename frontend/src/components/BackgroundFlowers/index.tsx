"use client";

import { DotLottieReact as Lottie } from "@lottiefiles/dotlottie-react";

const FLOWER_PATH = "/lottie/flower.json";

const BackgroundFlowers = () => {
  return (
    <>
      <Lottie
        className="fixed top-10 left-10 opacity-70 w-[200px] h-[200px] pointer-events-none"
        src={FLOWER_PATH}
        loop
        autoplay
        speed={1.4}
      />
      <Lottie
        className="fixed top-56 left-96 w-[100px] h-[100px] pointer-events-none"
        src={FLOWER_PATH}
        loop
        autoplay
        speed={2}
      />
      <Lottie
        className="fixed bottom-10 left-24 opacity-50 w-[150px] h-[150px] pointer-events-none"
        src={FLOWER_PATH}
        loop
        autoplay
        speed={2.6}
      />
      <Lottie
        className="fixed top-14 right-4 opacity-40 w-[400px] h-[400px] pointer-events-none"
        src={FLOWER_PATH}
        loop
        autoplay
        speed={1.5}
      />
      <Lottie
        className="fixed bottom-10 right-1/4 w-[200px] h-[200px] pointer-events-none"
        src={FLOWER_PATH}
        loop
        autoplay
        speed={1}
      />
    </>
  );
};

export default BackgroundFlowers;
