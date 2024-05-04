"use client";
import ImageCarousel from "@/components/ImageCarousel";
import NumberPicker from "@/components/NumberPicker";
import { printPrice } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { useCart, useCreateLineItem } from "medusa-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Attribute = { key: string; value: string };

type Props = {
  id: string;
  imgUrl: string;
  title: string;
  thumbnailTitle: string;
  price: number;
  media: string[];
  description_long: string;
  ingredients: string;
  color: string;
  attributes?: Attribute[];
  horizontal?: boolean;
};

const ProductItem = ({
  id,
  imgUrl,
  title,
  thumbnailTitle,
  price,
  media,
  description_long,
  ingredients,
  color,
  attributes,
  horizontal,
}: Props) => {
  const [amount, setAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const elementId = "productDetailsModal_" + id;

  // const { cart, isLoading } = useGetCart(cartId);
  // const createLineItem = useCreateLineItem(cartId);

  // const handleAddItem = (
  //   variantId: string,

  //   quantity: number
  // ) => {
  //   createLineItem.mutate(
  //     {
  //       variant_id: variantId,

  //       quantity,
  //     },
  //     {
  //       onSuccess: ({ cart }) => {
  //         console.log(cart.items);
  //       },
  //     }
  //   );
  // };

  if (horizontal) {
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
        <div className="h-full w-3/5 flex flex-col justify-between p-2">
          <p className="text-xl m-0">{title}</p>
          <div className="">
            <NumberPicker value={amount} setValue={setAmount} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="h-fit transition-all duration-500 group hover:cursor-pointer hover:scale-105 overflow-hidden card card-compact w-[200px] shadow-xl bg-gray-100"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(true)}
      >
        <figure className="h-fit scale-110 group-hover:scale-100 m-0 duration-500 rounded-lg">
          {!!imgUrl && (
            <Image src={imgUrl} alt={title} height={200} width={200} />
          )}
        </figure>
        <div className="flex justify-center p-4">
          <div className="text-center">
            {thumbnailTitle && (
              <div className="text-xl font-bold mt-4">{thumbnailTitle}</div>
            )}
            <p className="text-xl mb-0">{printPrice(price)}</p>
          </div>
        </div>
      </div>

      <dialog
        id={elementId}
        className="modal"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="modal-box w-11/12 max-w-4xl">
          <div className="flex flex-row gap-4 items-baseline align-middle">
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">
                  <ArrowLeft />
                </button>
              </form>
            </div>
            <h1 className="font-bold">{title}</h1>
          </div>

          {isOpen && (
            <div className="rounded-lg image-container">
              <ImageCarousel
                hash={title}
                images={media.map((item: any) => ({
                  id: item.id,
                  url: item.url,
                }))}
              />
            </div>
          )}

          <p className="py-4 text-justify">{description_long}</p>

          {ingredients && (
            <>
              <h3>Ingredients</h3>
              <p>{ingredients}</p>
            </>
          )}

          {attributes &&
            attributes.map((attribute: Attribute) => (
              <>
                <h3>{attribute.key}</h3>
                <p>{attribute.value}</p>
              </>
            ))}

          <div className="modal-footer flex flex-col-reverse md:flex-row gap-4 justify-between items-center mt-24">
            <div className="flex justify-center">
              <p className="font-sans text-sm text-center md:text-left">
                For details regarding ordering and products refer to the{" "}
                <Link href="/faq">FAQ</Link>
              </p>
            </div>
            <NumberPicker value={amount} setValue={setAmount} />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProductItem;
