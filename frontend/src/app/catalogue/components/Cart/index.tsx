"use client";

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { printPrice } from "@/utils";
import CartItem from "./components/Item";
import { useGetCart, useMedusa } from "medusa-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import LoadingIndicator from "@/components/LoadingIndicator";
import ItemList from "./components/ItemList";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");

export const Cart = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cartId = localStorage.getItem("cart_id") ?? "";
  const { cart } = useGetCart(cartId);
  const { client } = useMedusa();

  const hasItems = cart?.items && cart?.items?.length > 0;

  const loader = "auto";

  const onHandleProceed = () => {
    setIsLoading(true);

    client.carts.createPaymentSessions(cart?.id ?? "").then(({ cart }) => {
      const isStripeAvailable = cart.payment_sessions?.some(
        (session: any) => session.provider_id === "stripe"
      );

      if (isStripeAvailable) {
        client.carts
          .setPaymentSession(cart.id, {
            provider_id: "stripe",
          })
          .then(({ cart }) => {
            setClientSecret(cart?.payment_session?.data.client_secret);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
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

          <div className="overflow-y-scroll overflow-x-hidden flex flex-1 w-full">
            {!clientSecret ? (
              <div className="flex flex-1 flex-col justify-between">
                {hasItems ? (
                  <ItemList cart={cart} />
                ) : (
                  <div className="flex justify-center">
                    <p className="text-xl">Your cart is empty.</p>
                  </div>
                )}
                <div className="flex w-full justify-end">
                  {isLoading ? (
                    <div className="flex justify-center w-80 h-24">
                      <LoadingIndicator />
                    </div>
                  ) : (
                    <div className="flex gap-4 items-end">
                      <div className="badge badge-outline text-lg h-auto px-4 py-2">
                        {printPrice(cart?.total)}
                      </div>
                      <button
                        className="btn btn-primary"
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
                <CheckoutForm clientSecret={clientSecret} cartId={cart?.id} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
