"use client";

import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useProducts } from "medusa-react";
import Screen from "@/components/Screen";

export default function Catalogue() {
  const { products, isLoading } = useProducts();
  console.log(products);

  if (!products) {
    return (
      <Screen>
        <p>{"Couldn't load catalogue. Please retry later."}</p>
      </Screen>
    );
  }

  const productsWithVariants = products.filter(
    ({ variants }) => variants.length > 1
  );
  const productsWithoutVariants = products.filter(
    ({ variants }) => variants.length === 1
  );

  return (
    <Screen className="relative items-start min-w-[70vw] pt-20 pb-10">
      <div className="fixed top-0 flex h-auto min-w-[70vw] left-1/2 transform -translate-x-1/2 justify-between mt-20 z-10 gap-10">
        <PageHeader title={"Catalogue"} />
        <Cart items={[]} />
      </div>
      <div className="flex flex-col gap-10 overflow-scroll mt-20 rounded-lg">
        <div className="w-full flex flex-col gap-10">
          {productsWithVariants.map(({ title, variants }: any) => (
            <ProductList key={title} header={title} variants={variants} />
          ))}
        </div>
        <div className="w-full flex flex-wrap gap-5">
          {productsWithoutVariants.map(({ title, variants }: any) => (
            <ProductList key={title} header={title} variants={variants} />
          ))}
        </div>
      </div>
    </Screen>
  );
}
