import ImageCarousel from "@/components/ImageCarousel";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";

export default async function Activities() {
  const activity = (await fetchFromSanity("activity"))[0];

  return (
    <Screen>
      <PageHeader title={"Δραστηριότητες"} />
      <ImageCarousel items={activity.gallery.map((item: any) => item.asset)} />
      <div className="flex w-full justify-between items-start gap-14">
        <h2>{activity.title}</h2>
        <p>{activity.date}</p>
      </div>

      <PortableText value={activity.text as any} />
    </Screen>
  );
}
