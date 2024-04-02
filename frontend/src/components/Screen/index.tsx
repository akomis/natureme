import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Screen = ({ children }: Props) => {
  return (
    <div className="prose flex flex-col font-serif h-screen min-h-[1000px] justify-center mx-auto">
      {children}
    </div>
  );
};

export default Screen;
