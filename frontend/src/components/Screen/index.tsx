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
        "prose min-w-[50vw] flex flex-col font-serif h-screen min-h-[1000px] justify-center items-center mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Screen;
