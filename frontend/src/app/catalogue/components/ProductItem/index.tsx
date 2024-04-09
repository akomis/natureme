"use client";
import NumberPicker from "@/components/NumberPicker";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  id: string;
  imgUrl: string;
  title: string;
  description_short: string;
  description_long: string;
  ingredients: string;
  horizontal?: boolean;
};

const ProductItem = ({
  id,
  imgUrl,
  title,
  description_short,
  description_long,
  ingredients,
  horizontal,
}: Props) => {
  const [amount, setAmount] = useState(0);
  const elementId = "productDetailsModal_" + id;

  if (horizontal) {
    return (
      <div className="flex h-28 gap-2 bg-primary shadow-xl rounded-2xl overflow-hidden">
        <figure className="h-fit image-container rounded-xl m-0">
          <Image
            className="image rounded-xl border-2 border-secondary"
            src={imgUrl}
            alt={title}
            fill
          />
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
        className="transition-all duration-500 group hover:cursor-pointer hover:scale-105 overflow-hidden card card-compact w-[200px] shadow-xl bg-gray-100"
        onClick={() =>
          (document?.getElementById(elementId) as HTMLDialogElement).showModal()
        }
      >
        <figure className="h-fit scale-110 group-hover:scale-100 m-0 duration-500 rounded-lg">
          <Image src={imgUrl} alt={title} height={200} width={200} />
        </figure>
        <div className="card-body">
          <div className="text-center">
            <div className="text-xl font-bold">{title}</div>
            <p>{description_short}</p>
          </div>
        </div>
      </div>

      <dialog id={elementId} className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <div className="flex flex-row gap-4  items-baseline align-middle">
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

          <div className="rounded-lg image-container">
            <Image
              className="image m-0 max-h-[400px]"
              src={imgUrl}
              alt={title}
              fill
            />
          </div>
          <p className="py-4 text-justify">{description_long}</p>

          <h3>Ingredients</h3>
          <p>{ingredients}</p>

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
