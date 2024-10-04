"use client";

import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useCart, useMedusa, useProducts, useSessionCart } from "medusa-react";
import Screen from "@/components/Screen";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Flower2 } from "lucide-react";
import ErrorScreen from "@/components/ErrorScreen";

export default function Catalogue() {
  const { createCart } = useCart();
  const { client } = useMedusa();
  const { setItems, setRegion, clearItems } = useSessionCart();
  const { products, isLoading } = useProducts();

  useEffect(() => {
    if (products) {
      const cartId = localStorage.getItem("cart_id") ?? "";

      const getProductItemVariant = (variantId: any) => {
        if (products) {
          for (const product of products) {
            const variant = product.variants.find(
              (variant: any) => variant.id === variantId
            );

            if (variant) {
              return variant;
            }
          }
        }
        return null;
      };

      const handleCreateCart = () => {
        createCart.mutate(
          {},
          {
            onSuccess: ({ cart }: any) => {
              localStorage.setItem("cart_id", cart.id);
              clearItems();
              setRegion(cart.region);
            },
            onError: () => {
              toast.error(
                "There was a problem. Please try again later. (Couldn't create cart)"
              );
            },
          }
        );
      };

      const fetchCart = () => {
        client.carts.retrieve(cartId).then(({ cart }) => {
          if (cart) {
            setRegion(cart.region);
            setItems(
              cart.items.map(({ variant, quantity }: any) => ({
                variant: getProductItemVariant(variant.id),
                quantity,
              })) as any
            );
          }
        });
      };

      if (!cartId) {
        handleCreateCart();
      } else {
        fetchCart();
      }
    }
  }, [products]);

  const sortedProducts = useMemo(() => {
    return products
      ? products.sort((a, b) => b.variants.length - a.variants.length)
      : [];
  }, [products]);

  if (isLoading) {
    return (
      <Screen>
        <div>
          <LoadingIndicator />
        </div>
      </Screen>
    );
  }

  if (!products || !products.length) {
    return (
      <ErrorScreen message="Couldn't load catalogue. Please retry later." />
    );
  }

  return (
    <Screen className="items-start max-w-[90vw] pb-10">
      <div className="flex w-full justify-between items-center mt-20 z-10">
        <PageHeader title={"Catalogue"} />
        <Cart />
      </div>
      <div className="flex flex-col gap-10 w-full overflow-y-auto mt-10 rounded-lg">
        <div className="flex flex-wrap gap-20 pb-10 items-center justify-center md:justify-start md:items-start">
          {sortedProducts.map(
            ({ title, variants, description, images, options }: any, index) => (
              <ProductList
                index={index}
                key={title}
                header={title}
                variants={variants}
                description={description}
                optionTitles={options.map((option: any) => option.title)}
              />
            )
          )}
        </div>
        <div className="card bg-primary text-primary-content w-full">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row justify-start items-center gap-2 mb-2">
              <Flower2 size={40} strokeWidth={1.4} />
              <h2 className="card-title text-2xl m-0 whitespace-nowrap">
                Bulk Orders
              </h2>
            </div>
            <div className="flex flex-col font-sans">
              <p className="text-xl m-0">
                Presents for special occasions like wedding or christening
                gifts. Soaps or solid perfumes in paper box, decorated in your
                preference or beeswax creams in small jars. For more info on
                this feel free to{" "}
                <span>
                  <Link
                    href="/contact"
                    target="_blank"
                    className="font-bold no-underline text-purple-500 m-0 hover:text-pink-400 hover:cursor-pointer transition-all duration-700"
                  >
                    contact us.
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
