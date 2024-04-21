"use client";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animation from "./animation.json";
import dynamic from "next/dynamic";

const LoadingIndicator = () => {
  return <Lottie animationData={animation} loop={true} />;
};

export default LoadingIndicator;
