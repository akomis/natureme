"use client";

import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import { fake_products } from "./data";
import ProductList from "./components/ProductList";
import { useProducts } from "medusa-react";
import Screen from "@/components/Screen";

export default function Catalogue() {
  const { products, isLoading } = useProducts();
  console.log(products);

  return (
    <Screen className="items-start">
      <div className="flex justify-between w-full">
        <PageHeader title={"Κατάλογος"} />
        <Cart items={fake_products} />
      </div>
      <ProductList header="Products" items={fake_products} price={15} />
    </Screen>
  );
}
