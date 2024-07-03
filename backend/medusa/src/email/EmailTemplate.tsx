import { Order } from "@medusajs/medusa";
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
  const orderId = order.id.replace("order_", "#");
  const total = order.items.reduce(
    (total, item) => total + item.quantity * item.unit_price,
    0
  );

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

        <Container className="bg-jasmine p-4 rounded-xl">
          <Row>
            <Heading className="font-serif" as="h1">
              {message}
            </Heading>
          </Row>

          <Row>
            <Heading as="h5">
              Below you can find the details of your order
            </Heading>

            <Text>Order Number: {orderId}</Text>
            <Text>
              Address: {order.shipping_address?.address_1},{" "}
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city},{" "}
              {order.shipping_address?.country_code.toUpperCase()}
            </Text>

            <Hr />

            {order.items.map((item) => (
              <Row key={item.id}>
                <Column>
                  <Text>
                    {item.quantity} x {item.title}
                  </Text>
                </Column>
                <Column>
                  <Text>{printPrice(item.unit_price * item.quantity)}</Text>
                </Column>
              </Row>
            ))}

            <Text>Total: {printPrice(total)}</Text>

            <Hr />

            <Text className="font-serif text-black text-center">
              <Link
                className="font-bold text-[#b459d5]"
                href={"https://www.natureme.com.cy"}
              >
                NatureMe
              </Link>{" "}
              - We trust nature for everything
            </Text>

            <Text className="text-gray-200 text-center">
              Please do not reply to this email. For any support, please reach
              us through
              <Link
                className="font-bold text-[#b459d5]"
                href={"https://www.natureme.com.cy/contact"}
              >
                our contact page
              </Link>
            </Text>
          </Row>
        </Container>
      </Html>
    </Tailwind>
  );
}

export default EmailTemplate;
