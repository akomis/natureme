"use client";
import QuantityPicker from "@/components/QuantityPicker";
import { printPrice } from "@/utils";
import { useGetCart } from "medusa-react";
import Image from "next/image";

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

  return (
    <div className="flex h-[100px] w-[500px] bg-primary shadow-xl rounded-2xl overflow-hidden">
      <figure className="image-container max-w-24 rounded-xl m-0">
        {!!cartItem.thumbnail && (
          <Image
            className="image rounded-xl"
            src={cartItem.thumbnail}
            alt={cartItem.title}
            fill
          />
        )}
      </figure>
      <div className="flex flex-1 flex-col justify-between px-4 py-2">
        <div className="flex justify-between whitespace-nowrap items-end">
          <div className="flex gap-2 items-end">
            <div className="text-2xl">{cartItem.title}</div>
            <div>{`(${printPrice(cartItem.unit_price)})`}</div>
          </div>
          <div className="text-xl">{printPrice(cartItem.total)}</div>
        </div>
        <div className="flex justify-center">
          <QuantityPicker variantId={variantId} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
