type Props = {
  question: string;
  answer: string;
  defaultChecked: boolean;
};

export const AccordionItem = ({ question, answer, defaultChecked }: Props) => {
  return (
    <div
      key={question}
      className="collapse collapse-arrow bg-base-300 shrink-0"
    >
      <input type="radio" defaultChecked={defaultChecked} name="accordion" />
      <div className="collapse-title text-xl font-bold">{question}</div>
      <div className="collapse-content text-lg">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
