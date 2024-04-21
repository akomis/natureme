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
  const { cart, createCart } = useCart();

  useEffect(() => {
    const handleCreateCart = () => {
      createCart.mutate(
        products?.flatMap((product) =>
          product.variants.map((variant: any) => ({
            variant_id: variant.id,
            quantity: 0,
          }))
        ),
        {
          onSuccess: ({ cart }) => {
            localStorage.setItem("cart_id", cart.id);
          },
        }
      );
    };

    if (!!products && products.length) {
      handleCreateCart();
    }
  }, [!!products, products?.length]);

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
      <div className="flex h-auto justify-between mt-20 z-10 gap-20">
        <PageHeader title={"Catalogue"} />
        <Cart />
      </div>
      <div className="flex flex-col gap-10 w-full overflow-scroll mt-10 rounded-lg">
        <div className="flex flex-wrap gap-10 pb-10">
          {products.map(({ title, variants, description, images }: any) => (
            <ProductList
              key={title}
              header={title}
              variants={variants}
              description={description}
              images={images}
            />
          ))}
        </div>
      </div>
    </Screen>
  );
}
