"use client";

import { AnimatedText } from "@/components/AnimatedText";
import Logo from "@/components/Logo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_SIZE = 250;

const SLIDESHOW = [
  { slogan: "our body", imageUrl: "/header/soaps.png" },
  { slogan: "our clothes", imageUrl: "/header/detergent.png" },
  { slogan: "our gifts", imageUrl: "/header/giftboxes.png" },
  { slogan: "our skin", imageUrl: "/header/beeswax.png" },
  { slogan: "our celebrations", imageUrl: "/header/celebrations.png" },
];

const AnimatedImageSwitch = ({ index }: { index: number }) => {
  const variants = {
    out: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    in: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        key={index}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
        transition={{ ease: "easeInOut", duration: 1 }}
        className="mx-auto image-container"
      >
        <Image
          src={SLIDESHOW[index].imageUrl}
          style={{ objectFit: "contain" }}
          fill
          alt="Product"
          priority={index === 0}
        />
      </motion.div>
    </AnimatePresence>
  );
};

const Header = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      slideIndex < SLIDESHOW.length - 1
        ? setSlideIndex(slideIndex + 1)
        : setSlideIndex(0);
    }, 5000);
  }, [slideIndex]);

  return (
    <section className="flex flex-1 justify-center items-center min-h-fit max-h-screen p-4 sm:p-40 animate-fade-in">
      <div className="w-auto sm:w-[600px]">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <Logo height={LOGO_SIZE} width={LOGO_SIZE} priority />

          <div className="flex flex-col flex-1 items-center sm:items-start justify-center text-center whitespace-nowrap ml-4 gap-4">
            <p className="text-2xl sm:text-3xl text-center">
              We trust nature for
            </p>
            <AnimatedText
              key={slideIndex}
              words={SLIDESHOW[slideIndex].slogan}
              index={slideIndex}
            />
          </div>
        </div>
        <div className="mt-4 h-[200px] sm:h-[250px]">
          <AnimatedImageSwitch index={slideIndex} />
        </div>
      </div>
    </section>
  );
};

export default Header;
