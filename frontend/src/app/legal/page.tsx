import { fetchFromSanity } from "@/utils";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import { PortableText } from "next-sanity";

export default async function Legal() {
  const globalAssets = (await fetchFromSanity("global"))[0];
  const terms = globalAssets.terms;
  const privacy = globalAssets.privacy;

  return (
    <Screen className="min-w-[80vw]">
      <div className="flex flex-col h-full justify-center items-center">
        <PageHeader title={"Legal"} />

        <div
          role="tablist"
          className="tabs tabs-bordered font-sans bg-transparent"
        >
          <input
            type="radio"
            name="tabs"
            role="tab"
            className="tab whitespace-nowrap text-xl px-8"
            aria-label="Terms & Conditions"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box p-6 overflow-y-auto h-[80vh]"
          >
            <PortableText value={terms} />
          </div>

          <input
            type="radio"
            name="tabs"
            role="tab"
            className="tab whitespace-nowrap text-xl px-8"
            aria-label="Privacy Policy"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box p-6 overflow-y-auto h-[80vh]"
          >
            <PortableText value={privacy} />
          </div>
        </div>
      </div>
    </Screen>
  );
}
