"use client";

import PageHeader from "@/components/PageHeader";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useCart, useMedusa, useProducts, useSessionCart } from "medusa-react";
import Screen from "@/components/Screen";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import ErrorScreen from "@/components/ErrorScreen";
import CustomOrdersCard from "./components/CustomOrdersCard";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            ({ title, variants, description, options }: any, index) => (
              <ProductList
                index={index}
                key={title}
                header={title}
                variants={variants}
                description={description}
                productOptions={options.map((option: any) => ({
                  title: option.title,
                  id: option.id,
                }))}
              />
            )
          )}

          <CustomOrdersCard />
        </div>
      </div>
    </Screen>
  );
}
