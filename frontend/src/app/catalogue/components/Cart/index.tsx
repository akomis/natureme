"use client";

import { ShoppingBasket } from "lucide-react";
import { useGetCart, useSessionCart } from "medusa-react";
import CheckoutForm from "./components/CheckoutForm";
import CartItemList from "./components/CartItemList";
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");

export const Cart = () => {
  const cartId = localStorage.getItem("cart_id") ?? "";

  const { cart } = useGetCart(cartId);
  const { items } = useSessionCart();

  const hasItems = items && items.length > 0;

  const clientSecret = cart?.payment_sessions[0]?.data?.client_secret ?? null;
  const loader = "auto";

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
        <div className="flex flex-col justify-between bg-jasmine h-screen w-[500px] p-6 rounded-l-2xl shadow-2xl overflow-scroll overflow-x-hidden">
          <ShoppingBasket size={36} />

          <div className="flex flex-1 flex-col justify-between">
            {hasItems ? (
              <CartItemList />
            ) : (
              <p className="text-xl self-center">Your cart is empty.</p>
            )}

            {!clientSecret ? (
              <CustomerDetailsForm />
            ) : (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, loader }} // @ts-ignore
              >
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
