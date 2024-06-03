"use client";

import { useSessionCart } from "medusa-react";
import CartItem from "./components/CartItem";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

const CartItemList = () => {
  const { items } = useSessionCart();

  const listRef = useRef(null);

  useEffect(() => {
    listRef.current &&
      autoAnimate(listRef.current, {
        duration: 500,
        easing: "linear",
      });
  }, [listRef]);

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 p-0" ref={listRef}>
        {items.map((item: any) => {
          return (
            <li key={item.variant.id} className="list-none">
              <CartItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartItemList;
