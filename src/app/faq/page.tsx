import { QUESTIONS_AND_ANSWERS } from "./data";
import PageHeader from "@/components/PageHeader";

export default async function Faq() {
	return (
		<div className="prose font-serif h-screen min-h-[1000px] mx-auto flex">
			<div className="flex flex-col justify-center items-start gap-4">
				<PageHeader title={"FAQ"} />
				{QUESTIONS_AND_ANSWERS.map((qna, index) => (
					<div
						key={qna.question}
						className="collapse collapse-arrow bg-base-300 shrink-0"
					>
						<input
							type="radio"
							defaultChecked={index === 0}
							name="accordion"
						/>
						<div className="collapse-title text-xl font-bold">
							{qna.question}
						</div>
						<div className="collapse-content text-lg">
							<p>{qna.answer}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
