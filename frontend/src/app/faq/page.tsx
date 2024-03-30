import AccordionItem from "./components/AccordionItem";
import { QUESTIONS_AND_ANSWERS } from "./data";
import PageHeader from "@/components/PageHeader";

export default async function Faq() {
  return (
    <div className="prose font-serif h-screen min-h-[1000px] mx-auto flex">
      <div className="flex flex-col justify-center items-start gap-4">
        <PageHeader title={"FAQ"} />
        {QUESTIONS_AND_ANSWERS.map((qna, index) => (
          <AccordionItem
            key={qna.question}
            question={qna.question}
            answer={qna.answer}
            defaultChecked={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
