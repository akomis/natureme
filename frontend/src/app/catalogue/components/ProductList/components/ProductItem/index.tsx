"use client";
import ImageCarousel from "@/components/ImageCarousel";
import QuantityPicker from "@/components/QuantityPicker";
import { printPrice } from "@/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Attribute = { key: string; value: string };

type Props = {
  title: string;
  thumbnailTitle: string;
  media?: string[];
  description: string;
  attributes?: Attribute[];
  item: any;
};

const ProductItem = ({
  title,
  thumbnailTitle,
  media,
  description,
  attributes,
  item,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const elementId = "productDetailsModal_" + item.id;

  return (
    <>
      <div
        className="h-fit transition-all duration-500 group hover:cursor-pointer hover:scale-105 overflow-hidden card card-compact w-[200px] shadow-md bg-nescafeBoi"
        onClick={() => setIsOpen(true)}
      >
        <figure className="h-fit scale-100 group-hover:scale-105 m-0 duration-500 rounded-lg">
          {!!item.thumbnail && (
            <Image
              src={item.thumbnail}
              alt={title}
              height={200}
              width={200}
              unoptimized
            />
          )}
        </figure>
        <div className="flex justify-center items-center">
          <div className="text-center flex flex-col p-4">
            <div className="text-xl font-bold">{thumbnailTitle}</div>
            <p className="text-xl m-0">{printPrice(item?.prices[0]?.amount)}</p>
          </div>
        </div>
      </div>

      <dialog
        id={elementId}
        className="modal"
        role="dialog"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="modal-box w-11/12 max-w-4xl bg-jasmine">
          <div className="flex flex-row gap-4 items-baseline align-middle mb-5">
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">
                  <ArrowLeft />
                </button>
              </form>
            </div>
            <h1 className="font-bold mb-0">{title}</h1>
          </div>

          {isOpen && media && (
            <ImageCarousel
              images={media.map((image: any) => ({
                id: image.id,
                url: image.url,
              }))}
            />
          )}

          <p className="py-4 text-justify text-xl m-0">{description}</p>

          {item.material && (
            <>
              <h3>Ingredients</h3>
              <p>{item.material}</p>
            </>
          )}

          {attributes &&
            attributes.map((attribute: Attribute) => (
              <div key={attribute.key}>
                <h3>{attribute.key}</h3>
                <p>{attribute.value}</p>
              </div>
            ))}

          <div className="modal-footer flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
            <div className="flex justify-end">
              <p className="font-sans text-sm text-center md:text-left">
                For details regarding ordering and products refer to the{" "}
                <Link href="/faq">FAQ</Link>
              </p>
            </div>
            <QuantityPicker variant={item} size={24} />
          </div>
        </div>

        <label
          className="modal-backdrop bg-gray-600 opacity-50"
          htmlFor={elementId}
          onClick={() => {
            setIsOpen(false);
          }}
        ></label>
      </dialog>
    </>
  );
};

export default ProductItem;
