"use client";

import Screen from "@/components/Screen";
import { useStripe } from "@stripe/react-stripe-js";
import { Home } from "lucide-react";
import { useMedusa } from "medusa-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const stripe = useStripe();

  const { client } = useMedusa();

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret") ?? "";
    const cartId = localStorage.getItem("cart_id") ?? "";

    if (!clientSecret) {
      setStatus("Missing payment intent client secret.");
      return;
    }

    if (!cartId) {
      setStatus("Order placed.");
      return;
    }

    // Retrieve the PaymentIntent
    stripe?.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setStatus("Missing payment intent.");
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          client.carts.complete(cartId).then(({ data, response, type }) => {
            if (type !== "order") {
              setStatus("Payment succeeded, but order not created.");
            } else {
              setStatus("Payment and order created!");
              setOrderNo(data.id.replace("order_", "#"));
            }

            localStorage.removeItem("cart_id");
          });
          break;

        case "processing":
          setStatus(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          setStatus("Payment failed. Please try another payment method.");
          break;

        default:
          setStatus("Something went wrong.");
          break;
      }
    });
  }, [stripe, searchParams]);

  return (
    <Screen className="min-h-fit p-4">
      <h1 className="mb-1">Order Confirmation</h1>
      <p className="text-2xl text-center">
        Thank you for ordering! You should receive an email with the order
        details soon.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {status && (
          <button className="btn btn-lg pointer-events-none">
            Status
            <div className="badge badge-secondary p-4">{status}</div>
          </button>
        )}

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
