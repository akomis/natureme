import * as Form from "@radix-ui/react-form";

type Props = {
  email: string | null;
  setEmail: (email: string) => void;
  phone: string | null;
  setPhone: (phone: string) => void;
};

const ContactForm = ({ email, setEmail, phone, setPhone }: Props) => {
  const setPhoneInput = (phone: string) => {
    if (phone.length > 8 || !/^\d*$/.test(phone)) {
      return;
    }

    setPhone(phone);
  };

  return (
    <Form.Root className="flex flex-col gap-5 px-2">
      <Form.Field className="grid" name="email">
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
            className="box-border w-full bg-gray-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email ?? ""}
            required
            placeholder="your@email.com"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="grid" name="telephone">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-xl font-medium leading-[35px] text-gray-800">
            Telephone
          </Form.Label>
          <Form.Message
            className="text-lg text-gray-800 opacity-[0.8]"
            match="valueMissing"
          >
            Required field!
          </Form.Message>
          <Form.Message
            className="text-lg text-gray-800 opacity-[0.8]"
            match={(value) => !/^\d{8}$/.test(value)}
          >
            Invalid phone!
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-gray-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="text"
            onChange={(e) => setPhoneInput(e.target.value)}
            value={phone ?? ""}
            required
            placeholder="99112233"
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};

export default ContactForm;
