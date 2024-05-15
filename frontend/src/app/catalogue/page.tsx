"use client";

import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useCart, useProducts } from "medusa-react";
import Screen from "@/components/Screen";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect } from "react";

export default function Catalogue() {
  const { products, isLoading } = useProducts();
  const { createCart } = useCart();

  useEffect(() => {
    const handleCreateCart = () => {
      createCart.mutate(
        {},
        {
          onSuccess: ({ cart }) => {
            localStorage.setItem("cart_id", cart.id);
          },
        }
      );
    };

    handleCreateCart();
  }, []); // eslint-disable-line

  if (isLoading) {
    return (
      <Screen>
        <LoadingIndicator />
      </Screen>
    );
  }

  if (!products) {
    return (
      <Screen>
        <p>{"Couldn't load catalogue. Please retry later."}</p>
      </Screen>
    );
  }

  return (
    <Screen className="relative items-start max-w-[80vw] pt-20">
      <div className="flex h-auto justify-between mt-20 z-10 gap-20 px-2">
        <PageHeader title={"Catalogue"} />
        <Cart />
      </div>
      <div className="flex flex-col gap-10 w-full overflow-y-scroll mt-10 rounded-lg">
        <div className="flex flex-wrap gap-20 pb-10">
          {products.map(
            ({ title, variants, description, images, options }: any) => (
              <ProductList
                key={title}
                header={title}
                variants={variants}
                description={description}
                images={images}
                optionTitles={options.map((option: any) => option.title)}
              />
            )
          )}
        </div>
      </div>
    </Screen>
  );
}
