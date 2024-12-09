"use client";

import LoadingIndicator from "@/components/LoadingIndicator";
import { QueryClient } from "@tanstack/react-query";
import {
  CartProvider,
  MedusaProvider,
  SessionCartProvider,
} from "medusa-react";
import { Suspense } from "react";

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
        <SessionCartProvider>
          <Suspense fallback={<LoadingIndicator />}>{children}</Suspense>
        </SessionCartProvider>
      </CartProvider>
    </MedusaProvider>
  );
}
