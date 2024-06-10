import ImageCarousel from "@/components/ImageCarousel";
import ImageWithLoading from "@/components/ImageWithLoading";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import { fetchFromSanity, getRandomPastelColor } from "@/utils";
import { PortableText } from "next-sanity";

export default async function Activities() {
  const activities = await fetchFromSanity("activity");

  return (
    <Screen className="min-h-full ">
      <PageHeader title={"Activities"} />

      <div className="flex flex-col gap-10 w-full overflow-y-auto pr-4 rounded-lg">
        {activities.map((activity: any, index: number) => (
          <div key={activity.title} className="flex flex-col w-full ">
            <h2 className="p-4 rounded-xl bg-nescafeBoi w-fit">
              {activity.title}
            </h2>

            <ImageCarousel
              images={
                activity.gallery.map((item: any) => ({
                  id: item._key,
                  url: item,
                })) ?? []
              }
              isSanity
            />

            <div className="text-xl font-sans">
              <PortableText value={activity.text as any} />
            </div>

            <p className="italic self-end">{activity.date}</p>
            {index < activities.length - 1 && <div className="divider"></div>}
          </div>
        ))}
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
