"use client";

import LoadingIndicator from "@/components/LoadingIndicator";
import { sendEmail } from "@/utils";
import * as Form from "@radix-ui/react-form";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  // Function to submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current?.checkValidity()) {
      try {
        setIsLoading(true);
        await sendEmail(`Message from ${email}`, message);
        toast.success(`Thank you for your message!`);
        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        toast.error("Failed to send email. Please try again later.");
        formRef.current.reset();
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warning("Please fill in all required fields.");
    }
  };

  return (
    <Form.Root
      className="w-full min-w-fit flex flex-col"
      ref={formRef}
      onSubmit={handleSubmit}
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
            Required field!
          </Form.Message>
          <Form.Message
            className="text-lg text-gray-800 opacity-[0.8]"
            match="typeMismatch"
          >
            Invalid email!
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="font-sans box-border w-full bg-gray-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="Message">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-xl font-medium leading-[35px] text-gray-800">
            Message
          </Form.Label>
          <Form.Message
            className="text-lg text-gray-800 opacity-[0.8]"
            match="valueMissing"
          >
            Required field!
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="font-sans box-border w-full h-48 bg-gray-100 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us anything.."
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild className="mt-4">
        <div className="flex justify-end h-20">
          {isLoading ? (
            <div className="w-40 self-center">
              <LoadingIndicator />
            </div>
          ) : (
            <button
              className="btn btn-lg btn-primary font-bold"
              disabled={!email || !message}
            >
              <Send size={20} />
            </button>
          )}
        </div>
      </Form.Submit>
    </Form.Root>
  );
};

export default ContactForm;
