"use client";

import { DotLottieReact as Lottie } from "@lottiefiles/dotlottie-react";

const LoadingIndicator = () => {
  return <Lottie src={"./lottie/bubbles.json"} autoplay loop={true} />;
};

export default LoadingIndicator;
