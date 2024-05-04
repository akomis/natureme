"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn, getRandomPastelColor } from "@/utils";

export const AnimatedText = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]); // eslint-disable-line

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              style={{
                backgroundColor: getRandomPastelColor(),
                marginRight: 5,
                padding: 4,
                borderRadius: 10,
              }}
              key={word + idx}
              className="text-black opacity-0"
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-black text-4xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
