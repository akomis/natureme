"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient } from "@tanstack/react-query";
import { MedusaProvider } from "medusa-react";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");
const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const clientSecret = searchParams.get("payment_intent_client_secret") ?? "";
  const loader = "auto";

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, loader }}>
      <MedusaProvider
        queryClientProviderProps={{ client: queryClient }}
        baseUrl={process.env.NEXT_PUBLIC_MEDUSA_URL ?? "http://localhost:8000"}
      >
        {children}
      </MedusaProvider>
    </Elements>
  );
}
