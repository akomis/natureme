import ImageWithLoading from "@/components/ImageWithLoading";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";

export default async function Activities() {
  const activity = (await fetchFromSanity("activity"))[0];

  return (
    <Screen>
      <PageHeader title={"Activities"} />

      <div className="flex flex-col w-full">
        <h2>{activity.title}</h2>
        <p>{activity.date}</p>

        <PortableText value={activity.text as any} />
      </div>

      {/* <div className="h-[200px] flex gap-2">
        {activity.gallery.map((item: any) => (
          <ImageWithLoading
            key={item._key}
            image={{ id: item._key, url: item }}
            isSanity={true}
          />
        ))}
      </div> */}
    </Screen>
  );
}
