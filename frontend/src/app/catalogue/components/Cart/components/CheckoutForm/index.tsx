import { printPrice } from "@/utils";
import {
  LinkAuthenticationElement,
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useGetCart, useMedusa } from "medusa-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  clientSecret: string;
  cartId: string;
};

const CheckoutForm = ({ clientSecret, cartId }: Props) => {
  const [email, setEmail] = useState("");

  const { cart } = useGetCart(cartId);
  const stripe = useStripe();
  const elements = useElements();
  const { client } = useMedusa();

  async function handlePayment(e: any) {
    e.preventDefault();

    if (!stripe || !elements) return;

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
      })
      .then(({ error }) => {
        client.carts.complete(cartId).then((resp) => console.log(resp));
      });
  }

  return (
    <form className="flex flex-col gap-4">
      <LinkAuthenticationElement />
      <AddressElement
        onChange={(event) => {
          if (event.complete) {
          }
        }}
        options={{ mode: "shipping" }}
      />

      <div className="divider"></div>

      <PaymentElement />
      <div className="flex flex-1 gap-4 justify-end">
        <div className="badge badge-outline text-lg h-fit px-4 py-2">
          {printPrice(cart?.total)}
        </div>
        <button
          className="btn btn-primary flex flex-1"
          onClick={handlePayment}
          disabled={!stripe}
        >
          Checkout
        </button>
      </div>

      <p className="font-sans mb-0 text-center">
        By proceeding with the order you agree to the{" "}
        <Link href="/">Terms & Conditions</Link>
      </p>
    </form>
  );
};

export default CheckoutForm;
