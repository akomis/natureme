import { cn } from "@/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Screen = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "prose animate-fade-in min-w-[60vw] flex flex-col font-serif h-full min-h-screen justify-center items-center mx-auto p-10 pt-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Screen;
