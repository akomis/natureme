"use client";

import { ArrowLeft, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import ProductItem from "../ProductItem";

type Props = {
  items: any[];
};

export const Cart = ({ items }: Props) => {
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
                  €50
                </button>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Coupon"
                  className="input input-bordered w-24"
                />
                <button className="btn btn-primary">Proceed</button>
              </div>
            </div>
            <p>
              Με την ολοκλήρωση της παραγγελίας συμφωνώ με τους{" "}
              <Link href="/">Όρους & Προϋποθέσεις</Link>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Cart;
