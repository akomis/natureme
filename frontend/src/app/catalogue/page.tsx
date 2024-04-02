"use client";

import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import { fake_products } from "./data";
import ProductList from "./components/ProductList";
import { useProducts } from "medusa-react";

export default function Catalogue() {
  const { products, isLoading } = useProducts();

  console.log(products);

  return (
    <div className="prose flex flex-col font-serif h-screen min-h-[1000px] justify-center mx-auto">
      <div className="flex justify-between items-start self-center w-full">
        <PageHeader title={"Catalogue"} />
        <Cart items={fake_products} />
      </div>
      <ProductList header="Products" items={fake_products} price={15} />
    </div>
  );
}
