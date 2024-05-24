import LoadingIndicator from "@/components/LoadingIndicator";
import { printPrice } from "@/utils";
import {
  LinkAuthenticationElement,
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import { useCart, useGetCart, useMedusa, useUpdateCart } from "medusa-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  cartId: string;
};

const CheckoutForm = ({ cartId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<
    StripeAddressElementChangeEvent["value"] | null
  >(null);

  const { cart, refetch: refetchCart } = useGetCart(cartId);
  const updateCart = useUpdateCart(cartId);
  const stripe = useStripe();
  const elements = useElements();
  const { client } = useMedusa();

  const handlePayment = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.origin + "/confirmation",
      },
      redirect: "if_required",
    });

    if (result?.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      try {
        await updateCart.mutate({
          email,
          shipping_address: {
            first_name: shippingAddress?.name.split(" ")[0],
            last_name: shippingAddress?.name.split(" ")[1] ?? "",
            address_1: shippingAddress?.address.line1,
            address_2: shippingAddress?.address.line2,
            city: shippingAddress?.address.city,
            country_code: shippingAddress?.address.country.toLowerCase(),
            postal_code: shippingAddress?.address.postal_code,
          },
          billing_address: {
            first_name: shippingAddress?.name.split(" ")[0],
            last_name: shippingAddress?.name.split(" ")[1] ?? "",
            address_1: shippingAddress?.address.line1,
            address_2: shippingAddress?.address.line2,
            city: shippingAddress?.address.city,
            country_code: shippingAddress?.address.country.toLowerCase(),
            postal_code: shippingAddress?.address.postal_code,
          },
        });
        await refetchCart();
        await client.carts.complete(cartId);
      } catch (e: any) {
        console.log(e.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <form className="flex flex-col gap-5">
      <LinkAuthenticationElement
        onChange={(event) => setEmail(event.value.email)}
      />
      <AddressElement
        onChange={(event) => {
          setShippingAddress(event.value);
        }}
        options={{ mode: "shipping" }}
      />

      <div className="divider"></div>

      <PaymentElement />

      <div className="h-20 flex items-center">
        {isLoading ? (
          <div className="flex justify-center h-20 w-full">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="flex flex-1 gap-4 justify-end">
            <div className="badge badge-outline h-fit text-lg px-4 py-2">
              {printPrice(cart?.total)}
            </div>
            <button
              className="btn btn-primary text-lg flex flex-1"
              onClick={handlePayment}
              disabled={!stripe}
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      <p className="font-sans my-0 text-start">
        By proceeding with the order you agree to the{" "}
        <Link href="/">Terms & Conditions</Link>
      </p>
    </form>
  );
};

export default CheckoutForm;
