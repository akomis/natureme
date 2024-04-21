"use client";

import { ArrowLeft, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import ProductItem from "../ProductItem";
import { useEffect, useState } from "react";
import { useCart } from "medusa-react";
import { printPrice } from "@/utils";

type Props = {
  items: any[];
};

export const Cart = ({ items }: Props) => {
  const [email, setEmail] = useState("");

  const { cart, createCart } = useCart();

  const handleInputChange = (event: any) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const handleCreateCart = () => {
      createCart.mutate(
        {}, // create an empty cart
        {
          onSuccess: ({ cart }) => {
            localStorage.setItem("cart_id", cart.id);
          },
        }
      );
    };

    handleCreateCart();
    console.log("cart: ", cart);
  }, []);

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
            {items.map((item: any) => (
              <ProductItem key={"title"} {...item} horizontal />
            ))}
          </div>
          <div>
            <div className="flex justify-between w-full">
              <div>
                <button className="btn btn-outline pointer-events-none text-lg">
                  {printPrice(0)}
                </button>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="e-mail"
                  className="input input-bordered w-24"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
                <button className="btn btn-primary">Proceed</button>
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
