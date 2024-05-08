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

  const hasItems = cart?.items?.length > 0;

  return (
    <>
      <button
        className="drawer-button btn btn-secondary"
        onClick={() =>
          (
            document?.getElementById("cartModal") as HTMLDialogElement
          ).showModal()
        }
      >
        <ShoppingBasket />
        <div>{cart?.items?.length ?? 0}</div>
      </button>

      <dialog id="cartModal" className="modal">
        <div className="modal-box flex flex-col gap-20 max-w-2xl">
          <div>
            <div className="flex flex-row gap-4 items-baseline align-middle">
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">
                    <ArrowLeft />
                  </button>
                </form>
              </div>
              <h1>Cart</h1>
            </div>

            {hasItems ? (
              <div className="flex flex-col gap-2 items-center">
                {cart?.items.map((item: any) => (
                  <CartItem key={item.variant_id} variantId={item.variant_id} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <p className="text-xl">Your cart is empty.</p>
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between w-full">
              <div>
                <button className="btn btn-outline pointer-events-none text-lg">
                  {printPrice(cart?.total)}
                </button>
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
            <p className="font-sans">
              By proceeding with the order you agree to the{" "}
              <Link href="/">Terms & Conditions</Link>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Cart;
