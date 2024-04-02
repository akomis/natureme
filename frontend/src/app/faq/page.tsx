import AccordionItem from "./components/AccordionItem";
import PageHeader from "@/components/PageHeader";
import { sanity } from "@/utils";

export default async function Faq() {
  const faq = await sanity.fetch(`*[_type == "faq"]`);

  return (
    <div className="prose font-serif h-screen min-h-[1000px] mx-auto flex">
      <div className="flex flex-col justify-center items-start gap-4">
        <PageHeader title={"FAQ"} />
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
    </div>
  );
}
