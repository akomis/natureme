"use client";

import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { printPrice } from "@/utils";
import {
  useAddShippingMethodToCart,
  useCreatePaymentSession,
  useGetCart,
} from "medusa-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import LoadingIndicator from "@/components/LoadingIndicator";
import ItemList from "./components/ItemList";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");

export const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cartId = localStorage.getItem("cart_id") ?? "";
  const { cart, refetch: refetchCart } = useGetCart(cartId);
  const createPaymentSession = useCreatePaymentSession(cartId);
  const addShippingMethod = useAddShippingMethodToCart(cartId);

  const hasItems = cart?.items && cart?.items?.length > 0;
  const clientSecret = cart?.payment_sessions[0]?.data?.client_secret ?? null;
  const loader = "auto";

  const onHandleProceed = () => {
    setIsLoading(true);
    createPaymentSession.mutate(void 0, {
      onSuccess: ({ cart }) => {
        addShippingMethod.mutate(
          {
            option_id: "so_01HYG0KJ1Q7X51C2A4CZWZDEBC",
          },
          {
            onSuccess: () => {
              refetchCart();
              setIsLoading(false);
            },
          }
        );
      },
    });
  };

  return (
    <div className="drawer drawer-end">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label className="drawer-button btn btn-secondary" htmlFor="drawer">
          <ShoppingBasket />
          <div>{cart?.items?.length ?? 0}</div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col justify-between bg-jasmine h-screen w-[500px] pl-8 pr-4 pt-8 pb-4 rounded-l-2xl shadow-2xl">
          <ShoppingBasket size={36} />

          <div className="overflow-y-scroll overflow-x-hidden flex w-full">
            {!clientSecret ? (
              <div className="flex flex-1 flex-col">
                {hasItems ? (
                  <ItemList cart={cart} />
                ) : (
                  <div className="flex justify-center">
                    <p className="text-xl">Your cart is empty.</p>
                  </div>
                )}
                <div className="flex w-full h-20 justify-end items-center">
                  {isLoading ? (
                    <div className="flex justify-center w-full h-20">
                      <LoadingIndicator />
                    </div>
                  ) : (
                    <div className="flex gap-4 items-end">
                      <div className="badge badge-outline text-lg h-auto px-4 py-2">
                        {printPrice(cart?.total)}
                      </div>
                      <button
                        className="btn btn-primary btn-lg"
                        disabled={!hasItems}
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
                <CheckoutForm cartId={cart?.id} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
