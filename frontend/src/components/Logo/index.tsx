import { sanity } from "@/utils";
import SanityImage from "../SanityImage";
import Image from "next/image";

type Props = Omit<React.ComponentPropsWithRef<typeof Image>, "src" | "alt">;

const Logo = async (props: Props) => {
  const { logo } = (await sanity.fetch(`*[_type == "global"]`))[0];

  return <SanityImage {...props} image={logo} alt="NatureMe Logo" />;
};

export default Logo;
