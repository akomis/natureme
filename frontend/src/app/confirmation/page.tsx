"use client";

import HomeButton from "@/components/HomeButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import Screen from "@/components/Screen";
import { cn } from "@/utils";
import { useStripe } from "@stripe/react-stripe-js";
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

  const isOrderSuccesful = status === "Order placed!";

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret") ?? "";
    const cartId = localStorage.getItem("cart_id") ?? "";

    if (!clientSecret) {
      setStatus("Missing payment intent client secret.");
      return;
    }

    if (!cartId) {
      setStatus("Link invalid.");
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
          client.carts
            .complete(cartId)
            .then(({ data, response, type }) => {
              if (type !== "order") {
                setStatus(
                  "Payment succeeded, but order not placed succesfully."
                );
              } else {
                setStatus("Order placed!");
                setOrderNo(data.id.replace("order_", "#"));
              }

              localStorage.removeItem("cart_id");
              localStorage.removeItem("medusa-session-cart");
            })
            .catch(() => {
              setStatus("Couldn't process cart.");
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

  if (!status) {
    return (
      <Screen>
        <div className="h-40">
          <LoadingIndicator />
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <h1 className="mb-8">
        {isOrderSuccesful
          ? "Order Confirmation"
          : "There was a problem with the order"}
      </h1>
      {isOrderSuccesful && (
        <>
          <p className="text-2xl text-center">
            Thank you for ordering! You should receive an email with the order
            details soon.
          </p>

          {orderNo && (
            <p className="text-lg text-center font-sans text-black h-8">
              {"Order Number: " + orderNo.replace("order_", "#")}
            </p>
          )}
        </>
      )}

      {status && (
        <div className="flex flex-col md:flex-row gap-4">
          <button className={"btn btn-lg pointer-events-none"}>
            Status
            <div
              className={cn("badge badge-secondary p-4", {
                "bg-secondary": isOrderSuccesful,
                "badge-primary": !isOrderSuccesful,
              })}
            >
              {status}
            </div>
          </button>

          <HomeButton />
        </div>
      )}

      {!isOrderSuccesful && (
        <p className="font-sans text-lg text-center md:text-left">
          If you have questions do not hesitate to{" "}
          <Link href="/contact" target="_blank">
            contact us
          </Link>
          .
        </p>
      )}
    </Screen>
  );
};

export default Confirmation;
