"use client";

import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useCart, useMedusa, useProducts, useSessionCart } from "medusa-react";
import Screen from "@/components/Screen";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
              }))
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
    <Screen className="items-start max-w-[80vw]">
      <div className="flex w-full justify-between items-center mt-20 z-10 px-2">
        <PageHeader title={"Catalogue"} />
        <Cart />
      </div>
      <div className="flex flex-col gap-10 w-full overflow-y-scroll mt-10 rounded-lg">
        <div className="flex flex-wrap gap-20 pb-10">
          {products
            .sort((a, b) => b.variants.length - a.variants.length)
            .map(({ title, variants, description, images, options }: any) => (
              <ProductList
                key={title}
                header={title}
                variants={variants}
                description={description}
                images={images}
                optionTitles={options.map((option: any) => option.title)}
              />
            ))}
        </div>
      </div>
    </Screen>
  );
}
