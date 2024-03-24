import React from "react";
import ContactForm from "./components/ContactForm";
import PageHeader from "@/components/PageHeader";

export default async function Contact() {
	return (
		<div className="prose mx-auto self-center font-serif flex flex-col h-screen min-h-fit justify-center items-start gap-4">
			<PageHeader title={"Contact"} />
			<ContactForm />
		</div>
	);
}
