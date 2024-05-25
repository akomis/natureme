import LoadingIndicator from "@/components/LoadingIndicator";
import { printPrice } from "@/utils";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import {
  useCompleteCart,
  useGetCart,
  useMedusa,
  useUpdateCart,
} from "medusa-react";
import Link from "next/link";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/navigation";

type Props = {
  cartId: string;
};

const CheckoutForm = ({ cartId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<
    StripeAddressElementChangeEvent["value"] | null
  >(null);

  const { cart } = useGetCart(cartId);
  const updateCart = useUpdateCart(cartId);
  const { client } = useMedusa();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    const result = await stripe.confirmPayment({
      payment_method: {
        billing_details: {
          name,
          email,
        },
      },
      elements,
      confirmParams: {
        return_url: window.origin + "/confirmation",
      },
      // @ts-ignore
      redirect: "if_required",
    });

    console.log(result);

    if (result?.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      try {
        updateCart.mutate(
          {
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
          },
          {
            onSettled: () => {
              client.carts.complete(cartId).then((response) => {
                router.push(
                  `/confirmation?payment_intent_client_secret=${
                    cart?.payment_sessions[0]?.data?.client_secret ?? null
                  }`
                );
                setIsLoading(false);
              });

              // completeCart.mutate(void 0, {
              //   onSettled: (response) => {
              //     console.log("completeCart ", response);
              //     localStorage.removeItem("cart_id");
              //     setIsLoading(false);
              //   },
              // });
            },
          }
        );
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  return (
    <Form.Root className="flex flex-col gap-5 px-2 mt-4">
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
            className="box-border w-full bg-gray-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none text-gray-800 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Control>
      </Form.Field>

      <div className="divider"></div>

      <AddressElement
        onChange={(event) => {
          setShippingAddress(event.value);
        }}
        options={{ mode: "shipping" }}
      />

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
    </Form.Root>
  );
};

export default CheckoutForm;
