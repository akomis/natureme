import { ShippingMethod } from "@medusajs/medusa";

export const isDelivery = (shippingMethod: ShippingMethod) =>
  shippingMethod.shipping_option_id === "so_01HYG0KJ1Q7X51C2A4CZWZDEBC";
