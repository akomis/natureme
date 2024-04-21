"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { CartProvider, MedusaProvider } from "medusa-react";

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

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={process.env.NEXT_PUBLIC_MEDUSA_URL ?? "http://localhost:8000"}
    >
      <CartProvider>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <motion.div
            key={pathname}
            variants={variants}
            animate="in"
            initial="out"
            exit="out"
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </CartProvider>
    </MedusaProvider>
  );
}
