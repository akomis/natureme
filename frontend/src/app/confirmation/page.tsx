"use client";

import Screen from "@/components/Screen";
import { useStripe } from "@stripe/react-stripe-js";
import { Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const [message, setMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const stripe = useStripe();

  const clientSecret = searchParams.get("payment_intent_client_secret") ?? "";
  const orderNo = searchParams.get("order_no") ?? "";

  useEffect(() => {
    // Retrieve the PaymentIntent
    stripe?.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setMessage("Missing payment intent.");
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Success! Payment received.");
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  });

  return (
    <Screen className="min-h-fit p-4">
      <h1 className="mb-1">Order Confirmation</h1>
      <p className="text-2xl text-center">
        Thank you for ordering! You should receive an email with the order
        details soon.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <button className="btn btn-lg pointer-events-none">
          Status
          <div className="badge badge-secondary p-4">{message}</div>
        </button>

        <button
          onClick={() => {
            location.reload();
          }}
          className="btn btn-lg"
        >
          <RefreshCcw />
        </button>

        <Link href="/">
          <button className="btn btn-lg w-full">
            <Home />
          </button>
        </Link>
      </div>
      {orderNo && (
        <p className="text-lg text-center font-sans text-black">
          {"Order Number: " + orderNo.replace("order_", "#")}
        </p>
      )}
    </Screen>
  );
};

export default Confirmation;
