"use client";
import QuantityPicker from "@/components/QuantityPicker";
import { printPrice } from "@/utils";
import { useProduct, useSessionCart } from "medusa-react";

type Props = {
  item: any;
};

const CartItem = ({ item }: Props) => {
  const { product } = useProduct(item.variant.product_id);

  if (!product) return null;

  return (
    <div className="flex h-fit bg-primary shadow-xl rounded-xl">
      <div className="flex flex-1 flex-col justify-between px-4 py-2">
        <div className="flex justify-between gap-10 mt-2">
          <div className="">
            <div className="text-2xl">{`${product?.title}`} </div>
            {item.variant.title.toLowerCase() !== "default" && (
              <div className="text-xl">{`${item.variant.title}`} </div>
            )}
            <div className="text-sm">{`(${printPrice(
              item.variant.prices[0].amount
            )})`}</div>
          </div>

          <div className="flex flex-col justify-between items-end">
            <div className="text-xl">
              {
                //need to investigate why item.total doesnt update on quantity change
                printPrice(item.quantity * item.variant.prices[0].amount)
              }
            </div>
            <QuantityPicker variant={item.variant} size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
