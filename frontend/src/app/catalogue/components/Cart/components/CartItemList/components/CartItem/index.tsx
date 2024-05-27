"use client";
import QuantityPicker from "@/components/QuantityPicker";
import { printPrice } from "@/utils";
import { useGetCart } from "medusa-react";

type Props = {
  variantId: string;
};

const CartItem = ({ variantId }: Props) => {
  const cartId = localStorage.getItem("cart_id") ?? "";
  const { cart } = useGetCart(cartId);

  if (!cart) return null;

  const cartItem = cart.items.find(
    (item: any) => item.variant_id === variantId
  );

  if (!cartItem) return null;

  return (
    <div className="flex h-fit bg-primary shadow-xl rounded-xl">
      <div className="flex flex-1 flex-col justify-between px-4 py-2">
        <div className="flex justify-between gap-10 mt-2">
          <div className="">
            <div className="text-2xl">{`${cartItem?.title}`} </div>
            <div className="text-lg">{cartItem?.variant.title}</div>
            <div className="text-sm">{`(${printPrice(
              cartItem?.unit_price
            )})`}</div>
          </div>

          <div className="flex flex-col justify-end items-end">
            <div className="text-xl">{printPrice(cartItem?.total)}</div>
            <QuantityPicker variantId={variantId} size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
