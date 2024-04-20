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

  return (
    <Screen className="relative items-start max-w-[80vw] pt-20 pb-10">
      <div className="flex h-auto justify-between mt-20 z-10 gap-20">
        <PageHeader title={"Catalogue"} />
        <Cart items={[]} />
      </div>
      <div className="flex flex-col gap-10 w-full overflow-scroll mt-10 rounded-lg">
        <div className="flex flex-wrap gap-10">
          {products.map(({ title, variants }: any) => (
            <ProductList key={title} header={title} variants={variants} />
          ))}
        </div>
      </div>
    </Screen>
  );
}
