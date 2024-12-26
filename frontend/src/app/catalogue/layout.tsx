"use client";

import { ErrorBoundary as HighlightErrorBoundary } from "@highlight-run/next/client";
import { QueryClient } from "@tanstack/react-query";
import {
  CartProvider,
  MedusaProvider,
  SessionCartProvider,
} from "medusa-react";

const queryClient = new QueryClient();

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HighlightErrorBoundary showDialog>
      <MedusaProvider
        queryClientProviderProps={{ client: queryClient }}
        baseUrl={process.env.NEXT_PUBLIC_MEDUSA_URL ?? "http://localhost:8000"}
      >
        <CartProvider>
          <SessionCartProvider>{children}</SessionCartProvider>
        </CartProvider>
      </MedusaProvider>
    </HighlightErrorBoundary>
  );
}
