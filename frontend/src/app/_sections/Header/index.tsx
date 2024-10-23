"use client";

import { AnimatedText } from "@/components/AnimatedText";
import Logo from "@/components/Logo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_SIZE = 300;

const SLIDESHOW = [
  { slogan: "our body", imageUrl: "/header/soaps.png" },
  { slogan: "our clothes", imageUrl: "/header/detergent.png" },
  { slogan: "our gifts", imageUrl: "/header/giftboxes.png" },
  { slogan: "our skin", imageUrl: "/header/beeswax.png" },
  { slogan: "our special occasion", imageUrl: "/header/occasiongifts.png" },
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
        className="mx-auto w-max"
      >
        <Image
          src={SLIDESHOW[index].imageUrl}
          width={400}
          height={400}
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
    <section className="flex justify-center items-center min-h-[750px] max-h-screen p-40 animate-fade-in">
      <div className="w-[670px]">
        <div className="flex flex-col sm:flex-row  items-center justify-center">
          <div>
            <Logo height={LOGO_SIZE} width={LOGO_SIZE} priority />
          </div>
          <div className="flex flex-col flex-grow items-start justify-center  whitespace-nowrap ml-4">
            <div className="z-10">
              <p className="text-3xl flex">We trust nature for</p>
              <AnimatedText
                key={slideIndex}
                words={SLIDESHOW[slideIndex].slogan}
                index={slideIndex}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 h-[400px]">
          <AnimatedImageSwitch index={slideIndex} />
        </div>
      </div>
    </section>
  );
};

export default Header;
