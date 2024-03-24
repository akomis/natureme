"use client";

import { sendEmail } from "@/utils";
import * as Form from "@radix-ui/react-form";
import { Send } from "lucide-react";
import { useRef, useState } from "react";

const ContactForm = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const formRef = useRef<HTMLFormElement | null>(null);

	// Function to submit the form
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formRef.current?.checkValidity()) {
			await sendEmail(email, message);
			formRef.current.reset();
		} else {
			alert("Please fill in all required fields.");
		}
	};

	return (
		<Form.Root
			onSubmit={handleSubmit}
			ref={formRef}
			className="w-[500px] min-w-fit flex flex-col"
		>
			<Form.Field className="grid mb-[10px]" name="email">
				<div className="flex items-baseline justify-between">
					<Form.Label className="text-xl font-medium leading-[35px] text-gray-800">
						Email
					</Form.Label>
					<Form.Message
						className="text-lg text-gray-800 opacity-[0.8]"
						match="valueMissing"
					>
						Υποχρεωτικό πεδίο!
					</Form.Message>
					<Form.Message
						className="text-lg text-gray-800 opacity-[0.8]"
						match="typeMismatch"
					>
						Άκυρο email!
					</Form.Message>
				</div>
				<Form.Control asChild>
					<input
						className="box-border w-full bg-gray-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Control>
			</Form.Field>
			<Form.Field className="grid mb-[10px]" name="Message">
				<div className="flex items-baseline justify-between">
					<Form.Label className="text-xl font-medium leading-[35px] text-gray-800">
						Μήνυμα
					</Form.Label>
					<Form.Message
						className="text-lg text-gray-800 opacity-[0.8]"
						match="valueMissing"
					>
						Υποχρεωτικό πεδίο!
					</Form.Message>
				</div>
				<Form.Control asChild>
					<textarea
						className="box-border w-full h-48 bg-gray-100 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
						onChange={(e) => setMessage(e.target.value)}
						required
					/>
				</Form.Control>
			</Form.Field>
			<Form.Submit asChild className="self-end">
				<button className="hover:cursor-pointer mt-4 text-lg flex items-center gap-2 bg-primary hover:bg-secondary transition-all duration-300 px-4 py-2 rounded-2xl">
					Αποστολή
					<Send size={16} />
				</button>
			</Form.Submit>
		</Form.Root>
	);
};

export default ContactForm;
