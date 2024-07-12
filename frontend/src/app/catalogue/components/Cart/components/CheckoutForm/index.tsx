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
  useAddShippingMethodToCart,
  useGetCart,
  useSessionCart,
  useShippingOptions,
  useUpdateCart,
} from "medusa-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<
    StripeAddressElementChangeEvent["value"] | null
  >(null);
  const [selectedShippingOptionId, setSelectedShippingOptionId] = useState("");

  const cartId = localStorage.getItem("cart_id") ?? "";
  const { refetch: refetchCart } = useGetCart(cartId);
  const addShippingMethod = useAddShippingMethodToCart(cartId);
  const updateCart = useUpdateCart(cartId);
  const { items, total } = useSessionCart();
  const { shipping_options, isLoading: areShippingOptionsLoading } =
    useShippingOptions();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (selectedShippingOptionId)
      addShippingMethod.mutate(
        {
          option_id: selectedShippingOptionId,
        },
        {
          onSuccess: () => {
            refetchCart();
            setIsLoading(false);
          },
          onError: () => {
            toast.error(
              "There was a problem. Please try again later. (Couldn't update shipping method)"
            );
            setSelectedShippingOptionId("");
          },
        }
      );
  }, [selectedShippingOptionId]);

  const selectedShippingOptionObject = shipping_options?.find(
    (option) => option.id === selectedShippingOptionId
  );

  const isDelivery = selectedShippingOptionObject?.name === "Delivery";

  const handlePayment = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const firstName = shippingAddress?.name.split(" ")[0];
    const lastName = shippingAddress?.name.split(" ").slice(1).join(" ");

    const address = {
      first_name: firstName ?? undefined,
      last_name: lastName ?? undefined,
      address_1: shippingAddress?.address?.line1 ?? undefined,
      address_2: shippingAddress?.address?.line2 ?? undefined,
      city: shippingAddress?.address?.city ?? undefined,
      country_code:
        shippingAddress?.address?.country.toLowerCase() ?? undefined,
      postal_code: shippingAddress?.address?.postal_code ?? undefined,
    };

    updateCart.mutate({
      shipping_address: isDelivery ? address : {},
      billing_address: address,
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
      <div>
        <label className="form-control w-full">
          <select
            className="select select-bordered text-lg font-sans"
            value={selectedShippingOptionId}
            onChange={(e) => {
              setSelectedShippingOptionId(e.target.value as any);
            }}
          >
            <option value="" disabled>
              {areShippingOptionsLoading
                ? "Loading shipping options..."
                : "Please pick a shipping option"}
            </option>
            {shipping_options?.map((shippingOption) => {
              if (shippingOption.admin_only) return null;

              return (
                <option key={shippingOption.id} value={shippingOption.id}>
                  {`${shippingOption.name} - ${printPrice(
                    shippingOption.amount
                  )}`}
                </option>
              );
            })}
          </select>
        </label>
      </div>

      {!!selectedShippingOptionId && (
        <>
          <p className="text-xl font-sans mb-2">
            {isDelivery
              ? "Shipping & Billing Information"
              : "Billing Information"}
          </p>

          <AddressElement
            onChange={(event) => {
              setShippingAddress(event.value);
            }}
            options={{ mode: "billing" }}
          />

          <PaymentElement />
        </>
      )}

      <div className="h-20 flex items-center mt-6">
        {isLoading ? (
          <div className="flex justify-center h-20 w-full">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="flex flex-1 gap-4 justify-end">
            <div className="badge badge-outline h-fit min-w-24 text-lg px-4 py-2 font-sans">
              {printPrice(total + (selectedShippingOptionObject?.amount ?? 0))}
            </div>
            <button
              className="btn btn-primary text-lg flex flex-1"
              onClick={handlePayment}
              disabled={!stripe || !items.length || !selectedShippingOptionId}
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      <p className="font-sans my-0 text-start">
        By proceeding with the order you agree to the{" "}
        <Link href="/legal" target="_blank">
          Terms & Conditions
        </Link>
        .
      </p>
    </form>
  );
};

export default CheckoutForm;
