import PageHeader from "@/components/PageHeader";
import SanityImage from "@/components/SanityImage";
import Screen from "@/components/Screen";
import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";

const Carousel = ({ items }: any) => (
  <div className="flex flex-col gap-2 rounded-lg">
    <div className="carousel max-h-[300px] gap-4 w-full rounded-lg overflow-hidden">
      {items.map((item: any, index: number) => (
        <div
          key={`slide${index}`}
          id={`slide${index}`}
          className="carousel-item w-full"
        >
          <div className="image-container">
            <SanityImage
              className="image"
              image={item}
              alt={"activity image"}
            />
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center w-full gap-2">
      {items.map((_: any, index: number) => (
        <a
          key={`button${index}`}
          href={`#slide${index}`}
          className="bg-base-100 hover:bg-base-300 rounded-lg h-3 w-10 transition-all"
        ></a>
      ))}
    </div>
  </div>
);

export default async function Activities() {
  const activity = (await fetchFromSanity("activity"))[0];

  return (
    <Screen>
      <PageHeader title={"Δραστηριότητες"} />
      <Carousel items={activity.gallery.map((item: any) => item.asset)} />
      <div className="flex justify-between items-start gap-14">
        <h3>{activity.title}</h3>
        <p>{activity.date}</p>
      </div>

      <PortableText value={activity.text as any} />
    </Screen>
  );
}
