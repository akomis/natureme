"use client";

import LoadingIndicator from "@/components/LoadingIndicator";
import { isPhoneValid, printPrice } from "@/utils";
import * as Form from "@radix-ui/react-form";
import {
  useCreatePaymentSession,
  useGetCart,
  useSessionCart,
  useUpdateCart,
} from "medusa-react";
import { useState } from "react";
import { toast } from "react-toastify";

const CustomerDetailsForm = () => {
  const cartId = localStorage.getItem("cart_id") ?? "";

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { total, items } = useSessionCart();

  const { refetch: refetchCart } = useGetCart(cartId);
  const createPaymentSession = useCreatePaymentSession(cartId);
  const updateCart = useUpdateCart(cartId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    updateCart.mutate(
      {
        email,
        shipping_address: {
          phone,
        },
        billing_address: {
          phone,
        },
      },
      {
        onSuccess: () => {
          createPaymentSession.mutate(void 0, {
            onSettled: () => {
              refetchCart();
            },
            onError: () => {
              toast.error(
                "There was a problem. Please try again later. (Couldn't create payment session)"
              );
            },
          });
        },
        onError: () => {
          toast.error(
            "There was a problem. Please try again later. (Couldn't update user details)"
          );
        },
      }
    );
  };

  return (
    <Form.Root className="flex flex-col gap-5 px-2" onSubmit={handleSubmit}>
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
            className="font-sans box-border w-full bg-gray-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            match={(value) => !isPhoneValid(value)}
          >
            Invalid phone!
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="font-sans box-border w-full bg-gray-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
            placeholder="99112233"
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild className="self-end mt-4">
        <div className="flex justify-center h-20">
          {isLoading ? (
            <div className="w-40 self-center">
              <LoadingIndicator />
            </div>
          ) : (
            <div className="flex gap-4 items-end">
              <div className="badge badge-outline text-lg h-auto min-w-24 px-4 py-2 font-sans">
                {printPrice(total)}
              </div>
              <button
                className="btn btn-primary btn-lg"
                disabled={!email || !phone || !items.length}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      </Form.Submit>
    </Form.Root>
  );
};

export default CustomerDetailsForm;
