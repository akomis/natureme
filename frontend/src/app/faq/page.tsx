import { fetchFromSanity } from "@/utils";
import AccordionItem from "./components/AccordionItem";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import Link from "next/link";

export default async function Faq() {
  const faq = await fetchFromSanity("faq");

  return (
    <Screen>
      <div className="flex flex-col justify-center items-start gap-4">
        <PageHeader title={"FAQ"} />
        <div className="flex flex-col gap-10 w-full overflow-y-auto pr-4 rounded-lg">
          {faq.map(
            (
              { question, answer }: { question: string; answer: object },
              index: number
            ) => (
              <AccordionItem
                key={question}
                question={question}
                answer={answer}
                defaultChecked={index === 0}
              />
            )
          )}
        </div>
        <p className="font-sans text-lg text-center md:text-left">
          If you have any more questions do not hesitate to{" "}
          <Link href="/contact" target="_blank">
            contact us
          </Link>
          .
        </p>
      </div>
    </Screen>
  );
}
