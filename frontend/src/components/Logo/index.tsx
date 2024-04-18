"use client";
import Image from "next/image";

type Props = Omit<React.ComponentPropsWithRef<typeof Image>, "src" | "alt">;

const Logo = (props: Props) => {
  return <Image {...props} src={"/logo.png"} alt="NatureMe Logo" />;
};

export default Logo;
