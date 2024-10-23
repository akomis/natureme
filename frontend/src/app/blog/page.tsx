import ErrorScreen from "@/components/ErrorScreen";
import ImageCarousel from "@/components/ImageCarousel";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import { fetchFromSanity } from "@/utils";
import { PortableText } from "next-sanity";

export default async function Blog() {
  const posts = await fetchFromSanity("post");

  if (!posts || !posts.length) {
    return <ErrorScreen message="Couldn't load posts. Please retry later." />;
  }

  return (
    <Screen>
      <PageHeader title={"Blog"} />

      <div className="flex flex-1 flex-col gap-10 w-full overflow-y-auto pr-4 rounded-lg">
        {posts.map((post: any, index: number) => (
          <div key={post.title} className="flex flex-col w-full ">
            <h2 className="p-4 rounded-xl bg-nescafeBoi w-fit">{post.title}</h2>

            {post?.gallery && post?.gallery?.length > 0 && (
              <ImageCarousel
                images={post.gallery.map((item: any) => ({
                  id: item._key,
                  url: item,
                }))}
                isSanity
              />
            )}

            <div className="text-xl font-sans">
              <PortableText value={post.text} />
            </div>

            <p className="italic self-end">{post.date}</p>
            {index < posts.length - 1 && <div className="divider"></div>}
          </div>
        ))}
      </div>
    </Screen>
  );
}
