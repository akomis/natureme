"use client";

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { printPrice } from "@/utils";
import CartItem from "../CartItem";
import { useGetCart, useMedusa } from "medusa-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");

export const Cart = () => {
  const [clientSecret, setClientSecret] = useState(null);

  const cartId = localStorage.getItem("cart_id") ?? "";
  const { cart } = useGetCart(cartId);
  const { client } = useMedusa();

  const hasItems = cart?.items && cart?.items?.length > 0;

  const loader = "auto";

  const onHandleProceed = () => {
    client.carts.createPaymentSessions(cart?.id).then(({ cart }) => {
      const isStripeAvailable = cart.payment_sessions?.some(
        (session: any) => session.provider_id === "stripe"
      );

      if (!isStripeAvailable) {
        return;
      }

      client.carts
        .setPaymentSession(cart.id, {
          provider_id: "stripe",
        })
        .then(({ cart }) => {
          setClientSecret(cart.payment_session.data.client_secret);
        });
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
        <div className="flex flex-col justify-between gap-20 bg-jasmine min-w-[500px] p-8">
          <div className="flex flex-row gap-4 items-baseline align-middle">
            <ShoppingBasket size={36} />
          </div>

          {!clientSecret ? (
            <div>
              {hasItems ? (
                <div className="flex flex-col gap-4">
                  <ul className="flex flex-col gap-2">
                    {cart?.items.map((item: any) => (
                      <li className="list-none" key={item.variant_id}>
                        <CartItem variantId={item.variant_id} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex justify-center">
                  <p className="text-xl">Your cart is empty.</p>
                </div>
              )}
              <div className="flex w-full justify-end">
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
              </div>
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret, loader }}>
              <CheckoutForm clientSecret={clientSecret} cartId={cart?.id} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
