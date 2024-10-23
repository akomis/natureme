"use client";

import { ArrowLeft, BadgePlus, ShoppingBasket } from "lucide-react";
import { useGetCart, useSessionCart } from "medusa-react";
import CheckoutForm from "./components/CheckoutForm";
import CartItemList from "./components/CartItemList";
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRef } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");

export const Cart = () => {
  const cartId = localStorage.getItem("cart_id") ?? "";

  const { cart } = useGetCart(cartId);
  const { items } = useSessionCart();

  const drawerToggle = useRef<HTMLInputElement>(null);
  const toggleDrawer = () => {
    drawerToggle?.current?.click();
  };

  const hasItems = items && items.length > 0;

  const clientSecret = cart?.payment_sessions[0]?.data?.client_secret ?? null;
  const loader = "auto";

  return (
    <div className="drawer drawer-end w-fit overflow-hidden">
      <input
        ref={drawerToggle}
        id="drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content">
        <label
          className="drawer-button btn btn-secondary flex-nowrap"
          htmlFor="drawer"
        >
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
        <div className="flex flex-col justify-between bg-jasmine h-screen max-w-[100vw] w-[500px] p-6 rounded-l-2xl shadow-2xl overflow-scroll overflow-x-hidden">
          <button className="btn btn-secondary w-fit" onClick={toggleDrawer}>
            <ArrowLeft />
          </button>

          <div className="flex flex-1">
            {hasItems ? (
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <CartItemList />
                  <div className="divider"></div>
                </div>

                {!clientSecret ? (
                  <CustomerDetailsForm />
                ) : (
                  <Elements
                    stripe={stripePromise}
                    // @ts-ignore
                    options={{ clientSecret, loader }}
                  >
                    <CheckoutForm />
                  </Elements>
                )}
              </div>
            ) : (
              <div className="flex flex-1 flex-col justify-between">
                <p className="text-xl self-center">Your cart is empty.</p>
                <button
                  className="btn btn-primary btn-lg w-fit self-center"
                  onClick={toggleDrawer}
                >
                  <BadgePlus />
                  Add Items
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
