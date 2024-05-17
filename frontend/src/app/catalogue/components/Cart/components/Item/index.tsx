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

  if (!cartItem) return null;

  return (
    <div className="flex h-fit bg-primary shadow-xl rounded-xl">
      <figure className="image-container max-w-24 rounded-xl m-0">
        {!!cartItem?.thumbnail && (
          <Image
            className="image rounded-xl"
            src={cartItem.thumbnail}
            alt={cartItem.title}
            fill
          />
        )}
      </figure>
      <div className="flex flex-1 flex-col justify-between px-4 py-2">
        <div className="flex justify-between gap-10 mt-2">
          <div className="text-2xl leading-6">
            {`${cartItem?.title}`}{" "}
            <span className="text-sm">{`(${printPrice(
              cartItem?.unit_price
            )})`}</span>
          </div>

          <div className="text-xl ">{printPrice(cartItem?.total)}</div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <QuantityPicker variantId={variantId} size={16} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
