"use client";

import { ArrowLeft, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { printPrice } from "@/utils";
import CartItem from "../CartItem";
import { useGetCart } from "medusa-react";

export const Cart = () => {
  const [email, setEmail] = useState("");

  const cartId = localStorage.getItem("cart_id") ?? "";
  const { cart } = useGetCart(cartId);

  const handleInputChange = (event: any) => {
    setEmail(event.target.value);
  };

  const hasItems = cart?.items && cart?.items?.length > 0;

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
        <div className="flex flex-col justify-between gap-20 bg-jasmine h-screen px-8 py-16 rounded-s-xl shadow-2xl">
          <div>
            <div className="flex flex-row gap-4 items-baseline align-middle">
              <ShoppingBasket size={36} />
            </div>
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
          </div>

          <div>
            <div className="flex w-full justify-end">
              <div className="flex flex-col gap-4 items-end">
                <div className="badge badge-outline text-lg h-auto px-4 py-2">
                  {printPrice(cart?.total)}
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="* e-mail"
                    className="input input-bordered w-42"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    className="btn btn-primary"
                    disabled={!hasItems || !email}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
            <p className="font-sans mb-0 text-center">
              By proceeding with the order you agree to the{" "}
              <Link href="/">Terms & Conditions</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
