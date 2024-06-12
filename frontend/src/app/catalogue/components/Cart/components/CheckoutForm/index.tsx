import LoadingIndicator from "@/components/LoadingIndicator";
import { printPrice } from "@/utils";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import { useSessionCart, useUpdateCart } from "medusa-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<
    StripeAddressElementChangeEvent["value"] | null
  >(null);

  const cartId = localStorage.getItem("cart_id") ?? "";
  const updateCart = useUpdateCart(cartId);
  const { items, total } = useSessionCart();

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const firstName = shippingAddress?.name.split(" ")[0];
    const lastName = shippingAddress?.name.split(" ").slice(1).join(" ");

    updateCart.mutate({
      shipping_address: {
        first_name: firstName ?? undefined,
        last_name: lastName ?? undefined,
        address_1: shippingAddress?.address?.line1 ?? undefined,
        address_2: shippingAddress?.address?.line2 ?? undefined,
        city: shippingAddress?.address?.city ?? undefined,
        country_code:
          shippingAddress?.address?.country.toLowerCase() ?? undefined,
        postal_code: shippingAddress?.address?.postal_code ?? undefined,
      },
      billing_address: {
        first_name: firstName ?? undefined,
        last_name: lastName ?? undefined,
        address_1: shippingAddress?.address?.line1 ?? undefined,
        address_2: shippingAddress?.address?.line2 ?? undefined,
        city: shippingAddress?.address?.city ?? undefined,
        country_code:
          shippingAddress?.address?.country.toLowerCase() ?? undefined,
        postal_code: shippingAddress?.address?.postal_code ?? undefined,
      },
    });

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.origin + `/confirmation`,
      },
    });

    if (result?.error) {
      toast.error(`Couldn't process payment ${result.error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <form>
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
            <div className="badge badge-outline h-fit min-w-24 text-lg px-4 py-2">
              {printPrice(total)}
            </div>
            <button
              className="btn btn-primary text-lg flex flex-1"
              onClick={handlePayment}
              disabled={!stripe || !items.length}
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
