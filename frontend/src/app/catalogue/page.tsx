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
    <Screen className="p-2 sm:p-10 items-start max-w-[80vw]">
      <div className="flex w-[80vw] justify-between items-start z-10 fixed top-10 sm:top-16">
        <PageHeader title={"Catalogue"} />
        <Cart />
      </div>
      <div className="flex flex-col gap-10 w-full overflow-y-auto rounded-lg mt-24">
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
