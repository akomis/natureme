"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundFlowers from "../components/BackgroundFlowers";

const variants = {
  out: {
    opacity: 0,
    y: 40,
  },
  in: {
    opacity: 1,
    y: 0,
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={variants}
      animate="in"
      initial="out"
      transition={{ ease: "easeInOut", duration: 1 }}
      className="bg-jasmine"
    >
      <BackgroundFlowers />
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
  );
}
