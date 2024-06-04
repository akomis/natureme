"use client";

import { SessionCartProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import { CartProvider, MedusaProvider } from "medusa-react";

const queryClient = new QueryClient();

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={process.env.NEXT_PUBLIC_MEDUSA_URL ?? "http://localhost:8000"}
    >
      <CartProvider>
        <SessionCartProvider>{children}</SessionCartProvider>
      </CartProvider>
    </MedusaProvider>
  );
}
