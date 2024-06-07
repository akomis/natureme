import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

const About = async () => {
  const globalAssets = (await fetchFromSanity("global"))[0];
  const { about } = globalAssets;

  return (
    <section className="flex flex-col-reverse lg:flex-row gap-4 h-fit justify-center items-center p-10">
      <div className="flex flex-col w-[70vw] gap-2 rounded-lg">
        <Image
          src="/about_1.webp"
          alt="nature me soaps"
          width={500}
          height={500}
          className="rounded-lg"
        />
        <Image
          src="/about_2.webp"
          alt="nature me besswsax"
          width={500}
          height={500}
          className="rounded-xl"
        />

        <Image
          src="/about_3.webp"
          alt="nature me gift boxes"
          width={500}
          height={500}
          className="rounded-2xl"
        />
      </div>
      <div>
        <h2 className="text-4xl font-bold">About Us</h2>
        <div className="flex flex-col gap-4 text-xl">
          <PortableText value={about as any} />
        </div>
      </div>
    </section>
  );
};

export default About;
