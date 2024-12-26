import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import ContactForm from "./components/ContactForm";

export default async function Contact() {
  return (
    <Screen className="min-w-[40vw] gap-10">
      <PageHeader title={"Contact"} />
      <ContactForm />
    </Screen>
  );
}
