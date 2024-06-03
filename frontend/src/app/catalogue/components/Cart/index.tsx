"use client";

import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { isEmailValid, isPhoneValid, printPrice } from "@/utils";
import {
  useAddShippingMethodToCart,
  useCreatePaymentSession,
  useGetCart,
  useSessionCart,
  useUpdateCart,
} from "medusa-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import LoadingIndicator from "@/components/LoadingIndicator";
import CartItemList from "./components/CartItemList";
import ContactForm from "./components/ContactForm";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");

export const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  const cartId = localStorage.getItem("cart_id") ?? "";
  const { cart, refetch: refetchCart } = useGetCart(cartId);
  const { items, total } = useSessionCart();

  const createPaymentSession = useCreatePaymentSession(cartId);
  const addShippingMethod = useAddShippingMethodToCart(cartId);
  const updateCart = useUpdateCart(cartId);

  const hasItems = items && items.length > 0;
  const isProceedDisabled =
    !hasItems ||
    !email ||
    !isEmailValid(email) ||
    !phone ||
    !isPhoneValid(phone);
  const clientSecret = cart?.payment_sessions[0]?.data?.client_secret ?? null;
  const loader = "auto";

  const onHandleProceed = () => {
    setIsLoading(true);

    if (isProceedDisabled) return;

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
            onSuccess: () => {
              addShippingMethod.mutate(
                {
                  option_id: "so_01HYG0KJ1Q7X51C2A4CZWZDEBC",
                },
                {
                  onSuccess: () => {
                    refetchCart();
                    setIsLoading(false);
                  },
                  onError: () => {
                    toast.error(
                      "There was a problem. Please try again later. (Couldn't update shipping methrod)"
                    );
                  },
                }
              );
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
    <div className="drawer drawer-end w-fit">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label className="drawer-button btn btn-secondary" htmlFor="drawer">
          <ShoppingBasket />
          <div className="badge badge-sm py-3">{items?.length ?? 0}</div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col justify-between bg-jasmine h-screen w-[500px] p-6 rounded-l-2xl shadow-2xl">
          <ShoppingBasket size={36} />

          <div className="overflow-x-hidden flex w-full">
            <div className="flex flex-1 flex-col">
              {hasItems ? (
                <>
                  <CartItemList />
                  <div className="divider"></div>
                </>
              ) : (
                <div className="flex justify-center">
                  <p className="text-xl">Your cart is empty.</p>
                </div>
              )}

              {!clientSecret ? (
                <div>
                  {hasItems && (
                    <ContactForm
                      email={email}
                      setEmail={setEmail}
                      phone={phone}
                      setPhone={setPhone}
                    />
                  )}
                  <div className="flex w-full h-20 justify-end items-center mt-5">
                    {isLoading ? (
                      <div className="flex justify-center w-full h-20">
                        <LoadingIndicator />
                      </div>
                    ) : (
                      <div className="flex gap-4 items-end">
                        <div className="badge badge-outline text-lg h-auto min-w-24 px-4 py-2">
                          {printPrice(total)}
                        </div>
                        <button
                          className="btn btn-primary btn-lg"
                          disabled={isProceedDisabled}
                          onClick={onHandleProceed}
                        >
                          Proceed
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret, loader }}
                >
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
