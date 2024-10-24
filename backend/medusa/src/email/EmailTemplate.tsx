import { Order, ShippingMethod } from "@medusajs/medusa";
import {
  Html,
  Container,
  Text,
  Tailwind,
  Heading,
  Row,
  Hr,
  Head,
  Column,
  Link,
  Section,
} from "@react-email/components";

export const printPrice = (amount?: number | null) => {
  const formattedPrice = (amount ?? 0) / 100;
  const priceString = formattedPrice.toFixed(2);

  if (priceString.endsWith(".00")) {
    return `€${formattedPrice.toFixed(0)}`;
  } else {
    return `€${priceString}`;
  }
};

type EmailTemplateProps = {
  message: string;
  order: Order;
};

export function EmailTemplate({ message, order }: EmailTemplateProps) {
  const isDelivery = (shippingMethod: ShippingMethod) =>
    shippingMethod.shipping_option_id ===
    process.env.DELIVERY_SHIPPING_OPTION_ID;

  const orderId = order.id.replace("order_", "#");
  const shippingMethod = order.shipping_methods[0];

  const total =
    order.items.reduce(
      (total, item) => total + item.quantity * item.unit_price,
      0
    ) + shippingMethod?.price ?? 0;

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              jasmine: "#F4E8E1",
              nescafeBoi: "#FFECD2",
            },
            fontFamily: {
              serif: ["Mynerve", "cursive"],
              sans: ["LXGW WenKai TC", "sans-serif"],
            },
          },
        },
      }}
    >
      <Html lang="en">
        <Head>
          <title>{message}</title>
        </Head>
        <Section className="bg-jasmine p-10 h-screen w-screen">
          <Container className="bg-nescafeBoi p-4 rounded-2xl">
            <Row>
              <Heading className="font-serif" as="h1">
                {message}
              </Heading>
            </Row>

            <Row>
              <Heading as="h5">Order Details</Heading>

              <Text>Order Number: {orderId}</Text>

              {isDelivery(shippingMethod) ? (
                <Text>
                  Address: {order.shipping_address?.address_1},{" "}
                  {order.shipping_address?.postal_code},{" "}
                  {order.shipping_address?.city},{" "}
                  {order.shipping_address?.country_code.toUpperCase()}
                </Text>
              ) : (
                <Text>
                  Pickup from{" "}
                  <Link
                    className="font-bold"
                    href={"https://maps.app.goo.gl/pzgSZoSXP2TUvjdH6"}
                  >
                    our store at Apollonos 4, Lympia, 2566.
                  </Link>
                </Text>
              )}

              <Hr />

              {order.items.map((item) => (
                <Row key={item.id}>
                  <Column>
                    <Text>
                      {item.quantity} x {item.title}
                    </Text>
                  </Column>
                  <Column>
                    <Text className="text-right">
                      {printPrice(item.unit_price * item.quantity)}
                    </Text>
                  </Column>
                </Row>
              ))}

              <Row>
                <Column>
                  <Text>Shipping</Text>
                </Column>
                <Column>
                  <Text>{printPrice(shippingMethod?.price)}</Text>
                </Column>
              </Row>

              <Text>Total: {printPrice(total)}</Text>

              <Hr />

              <Text className="font-serif text-xl text-black text-center">
                <Link
                  className="font-bold text-[#b459d5]"
                  href={"https://www.natureme.com.cy"}
                >
                  NatureMe
                </Link>{" "}
                - We trust nature for everything
              </Text>

              <Text className="text-sm text-gray-800 text-center">
                Please do not reply to this email.{"\n"}
                Instead, comunnicate with us through{" "}
                <Link
                  className="font-bold text-gray-700 hover:text-white"
                  href={"https://www.natureme.com.cy/contact"}
                >
                  our contact page
                </Link>
                .
              </Text>
            </Row>
          </Container>
        </Section>
      </Html>
    </Tailwind>
  );
}

export default EmailTemplate;
