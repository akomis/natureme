"use client";
import QuantityPicker from "@/components/QuantityPicker";
import { printPrice } from "@/utils";
import Image from "next/image";

type Props = {
  id: string;
  imgUrl: string;
  title: string;
  total: number;
};

const CartItem = ({ id, imgUrl, title, total }: Props) => {
  return (
    <div className="flex h-28 gap-2 bg-primary shadow-xl rounded-2xl overflow-hidden">
      <figure className="h-fit image-container rounded-xl m-0">
        {!!imgUrl && (
          <Image
            className="image rounded-xl border-2 border-secondary"
            src={imgUrl}
            alt={title}
            fill
          />
        )}
      </figure>
      <div className="flex flex-col justify-between px-4 py-2">
        <div className="h-fit flex justify-between">
          <div className="text-xl">{title}</div>
          <div>{printPrice(total)}</div>
        </div>

        <div>
          <QuantityPicker variantId={id} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
