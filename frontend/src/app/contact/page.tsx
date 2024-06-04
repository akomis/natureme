import React from "react";
import ContactForm from "./components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";

export default async function Contact() {
  return (
    <Screen className="gap-4">
      <PageHeader title={"Contact"} />
      <ContactForm />
    </Screen>
  );
}
