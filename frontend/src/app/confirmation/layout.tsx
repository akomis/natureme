"use client";

import LoadingIndicator from "@/components/LoadingIndicator";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient } from "@tanstack/react-query";
import { MedusaProvider } from "medusa-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "pk_");
const queryClient = new QueryClient();

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const clientSecret = searchParams.get("payment_intent_client_secret") ?? "";

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <StripeProvider>
        <MedusaProvider
          queryClientProviderProps={{ client: queryClient }}
          baseUrl={
            process.env.NEXT_PUBLIC_MEDUSA_URL ?? "http://localhost:8000"
          }
        >
          {children}
        </MedusaProvider>
      </StripeProvider>
    </Suspense>
  );
}
