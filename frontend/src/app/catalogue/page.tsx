import PageHeader from "@/components/PageHeader";

export default async function Catalogue() {
  return (
    <div className="prose font-serif h-screen min-h-[1000px] mx-auto flex">
      <div className="flex flex-col justify-center items-start gap-4">
        <PageHeader title={"Catalogue"} />
      </div>
    </div>
  );
}
