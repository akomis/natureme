import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

const About = async () => {
  const globalAssets = (await fetchFromSanity("global"))?.[0];
  const { about } = globalAssets;

  return (
    <section className="flex flex-col-reverse lg:flex-row gap-4 h-fit justify-center items-center p-10">
      <div className="flex flex-col w-full md:w-[50vw] gap-2 rounded-lg items-center">
        <Image
          src="/about_1.webp"
          alt="nature me soaps"
          width={500}
          height={500}
          className="rounded-lg ml-20"
        />
        <div className="flex flex-col xl:flex-row gap-20 my-10">
          <Image
            src="/about_2.webp"
            alt="nature me besswsax"
            width={400}
            height={300}
            className="rounded-xl max-h-[300px] mt-10"
          />
          <div className="w-[70vw]">
            <h2 className="text-4xl font-bold">About Us</h2>
            <div className="flex flex-col gap-4 text-xl font-sans">
              <PortableText value={globalAssets?.about} />
            </div>
          </div>
        </div>

        <Image
          src="/about_3.webp"
          alt="nature me gift boxes"
          width={500}
          height={500}
          className="rounded-2xl ml-auto"
        />
      </div>
    </section>
  );
};

export default About;
