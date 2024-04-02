import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Screen = ({ children }: Props) => {
  return (
    <div className="prose min-w-[50vw] flex flex-col font-serif h-screen min-h-[1000px] justify-center items-center mx-auto">
      {children}
    </div>
  );
};

export default Screen;
