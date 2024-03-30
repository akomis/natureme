import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import { products } from "./data";
import ProductList from "./components/ProductList";

export default async function Catalogue() {
  return (
    <div className="prose flex flex-col font-serif h-screen min-h-[1000px] justify-center mx-auto">
      <div className="flex justify-between items-start self-center w-full">
        <PageHeader title={"Catalogue"} />
        <Cart items={products} />
      </div>
      <ProductList header="Products" items={products} price={15} />
    </div>
  );
}
