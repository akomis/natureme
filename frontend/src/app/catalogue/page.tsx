"use client";

import ErrorScreen from "@/components/ErrorScreen";
import LoadingIndicator from "@/components/LoadingIndicator";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import { useCart, useMedusa, useProducts, useSessionCart } from "medusa-react";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Cart from "./components/Cart";
import CustomOrdersCard from "./components/CustomOrdersCard";
import ProductList from "./components/ProductList";

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

      const handleCreateCart = async () => {
        await createCart.mutate(
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
        client.carts
          .retrieve(cartId)
          .then(({ cart }) => {
            if (cart) {
              setRegion(cart.region);
              setItems(
                cart.items.map(({ variant, quantity }: any) => ({
                  variant: getProductItemVariant(variant.id),
                  quantity,
                })) as any
              );
            }
          })
          .catch(() => {
            handleCreateCart();
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
        <LoadingIndicator />
      </Screen>
    );
  }

  if (!products || !products.length) {
    return (
      <ErrorScreen message="Couldn't load catalogue. Please retry later." />
    );
  }

  return (
    <Screen className="w-full max-w-[1710px]">
      <div className="flex w-full max-w-[1670px] justify-between items-center z-10 fixed top-4 px-2 sm:top-10">
        <div className="p-1 bg-jasmine/80 rounded-2xl">
          <PageHeader title={"Catalogue"} />
        </div>
        <div className="p-1 bg-jasmine/80 rounded-2xl">
          <Cart />
        </div>
      </div>
      <div className="flex w-full flex-col gap-10 overflow-y-auto rounded-lg mt-20">
        <div className="flex flex-wrap w-full px-4 gap-20 items-center justify-center md:justify-start md:items-start">
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
