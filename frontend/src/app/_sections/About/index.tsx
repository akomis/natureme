import ImageBentoGrid from "@/components/ImageBentoGrid";
import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

const About = async () => {
  const globalAssets = (await fetchFromSanity("global"))[0];
  const { about } = globalAssets;

  return (
    <section className="flex flex-col-reverse lg:flex-row gap-4 h-fit justify-center items-center p-10">
      <div className="min-h-fit">
        <ImageBentoGrid
          hash="activity"
          images={[
            { id: "1", url: "/about_1.webp" },
            { id: "2", url: "/about_2.webp" },
            { id: "3", url: "/about_3.webp" },
          ]}
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
