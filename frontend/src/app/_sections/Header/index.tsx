"use client";

import { AnimatedText } from "@/components/AnimatedText";
import Logo from "@/components/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LOGO_SIZE = 250;

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
        className="mx-auto w-fit"
      >
        <Image
          src={SLIDESHOW[index].imageUrl}
          width={500}
          height={500}
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
      console.log(slideIndex);

      slideIndex < SLIDESHOW.length - 1
        ? setSlideIndex(slideIndex + 1)
        : setSlideIndex(0);
    }, 5000);
  }, [slideIndex]);

  return (
    <section className="flex justify-center items-center min-h-[500px] h-screen max-h-screen">
      <div className="h-[50vh] w-[600px]">
        <div className="flex flex-1 justify-between">
          <div className="image-container max-w-[250px]">
            <Logo height={200} width={200} className="image" priority />
          </div>

          <div className="flex flex-col items-center justify-center my-5 whitespace-nowrap w-full ml-4">
            <div className="w-full">
              <p className="text-2xl flex flex-1">{"We trust nature for"}</p>
              <AnimatedText
                key={slideIndex}
                words={SLIDESHOW[slideIndex].slogan}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <AnimatedImageSwitch index={slideIndex} />
        </div>
      </div>
      <div
        className={"fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10"}
      >
        <Link href="/catalogue">
          <button className="hover:cursor-pointer flex items-center gap-2 bg-primary hover:bg-secondary transition-all duration-300 px-4 py-2 rounded-2xl hover:z-10 hover:shadow-lg hover:scale-110">
            <div className="font-bold text-xl">Catalogue</div>
            <ArrowRightCircle />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Header;
