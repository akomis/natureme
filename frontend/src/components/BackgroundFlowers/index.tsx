"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const BackgroundFlowers = () => {
  return (
    <>
      <DotLottieReact
        className="fixed top-2 left-4 pointer-events-none"
        src="/bganimation.json"
        loop
        autoplay
      />
      <DotLottieReact
        className="fixed top-56 left-96 pointer-events-none"
        src="/bganimation.json"
        loop
        autoplay
        speed={2.5}
      />
      <DotLottieReact
        className="fixed bottom-96 right-20 opacity-40 w-[400px] h-[400px] pointer-events-none"
        src="/bganimation.json"
        loop
        autoplay
        speed={1.5}
      />
      <DotLottieReact
        className="fixed bottom-10 right-64 pointer-events-none"
        src="/bganimation.json"
        loop
        autoplay
        speed={2}
      />
    </>
  );
};

export default BackgroundFlowers;
