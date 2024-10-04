"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundFlowers from "../components/BackgroundFlowers";

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.75,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5,
    },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={pathname}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        {/* <BackgroundFlowers /> */}
        <div>{children}</div>

        <ToastContainer
          position="bottom-center"
          autoClose={3500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
          transition={Bounce}
          limit={1}
        />
      </motion.div>
    </AnimatePresence>
  );
}
