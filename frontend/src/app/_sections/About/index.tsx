import { sanity } from "@/utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

const About = async () => {
  const globalAssets = (await sanity.fetch(`*[_type == "global"]`))[0];
  const { about } = globalAssets;

  return (
    <section className="flex flex-col-reverse lg:flex-row gap-4 h-screen justify-center items-center">
      <div className="w-[100vw] grid grid-cols-1 gap-2">
        <div className="image-container max-h-56">
          <Image
            className="image"
            src={"/about_1.webp"}
            fill
            alt="Κεραλοιφές NatureMe"
          />
        </div>
        <div className="image-container flex gap-2 max-h-40">
          <Image
            className="image"
            src={"/about_2.webp"}
            fill
            alt="Αρωματικά Χώρου NatureMe"
          />
          <Image
            className="image"
            src={"/about_3.webp"}
            fill
            alt="Σαπούνια NatureMe"
          />
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-bold">ΠΙΟΙ ΕΙΜΑΣΤΕ</h2>
        <div className="flex flex-col gap-4 text-xl">
          <PortableText value={about as any} />
        </div>
      </div>
    </section>
  );
};

export default About;
