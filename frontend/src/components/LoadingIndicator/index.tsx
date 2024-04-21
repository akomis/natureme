import Lottie from "lottie-react";
import animation from "./animation.json";

const LoadingIndicator = () => {
  return <Lottie animationData={animation} loop={true} />;
};

export default LoadingIndicator;
