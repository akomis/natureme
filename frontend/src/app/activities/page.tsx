import ImageBentoGrid from "@/components/ImageBentoGrid";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";

export default async function Activities() {
  const activity = (await fetchFromSanity("activity"))[0];

  return (
    <Screen>
      <PageHeader title={"Activities"} />
      <div className="pt-4">
        <ImageBentoGrid
          hash={activity.title}
          isSanity={true}
          images={activity.gallery.map((item: any) => ({
            id: item.asset.id,
            url: item.asset,
          }))}
        />
      </div>
      <div className="flex flex-col w-full">
        <h2>{activity.title}</h2>
        <p>{activity.date}</p>

        <PortableText value={activity.text as any} />
      </div>
    </Screen>
  );
}
