import { PortableText } from "@portabletext/react";

type Props = {
  question: string;
  answer: object;
  defaultChecked: boolean;
};

export const AccordionItem = ({ question, answer, defaultChecked }: Props) => {
  return (
    <div key={question} className="collapse collapse-arrow bg-nescafeBoi">
      <input type="radio" defaultChecked={defaultChecked} name="accordion" />
      <div className="collapse-title text-xl font-bold">{question}</div>
      <div className="collapse-content text-xl">
        <PortableText value={answer as any} />
      </div>
    </div>
  );
};

export default AccordionItem;
