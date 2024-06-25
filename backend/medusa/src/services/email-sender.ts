import {
  AbstractNotificationService,
  CartService,
  OrderService,
} from "@medusajs/medusa";
import { Resend } from "resend";

export default class EmailSenderService extends AbstractNotificationService {
  static identifier = "email-sender";
  protected orderService_: OrderService;
  protected cartService_: CartService;
  protected emailClient_: Resend;

  constructor(container, options) {
    super(container);
    this.orderService_ = container.orderService;
    this.cartService_ = container.cartService;
    this.emailClient_ = new Resend(process.env.RESEND_API_KEY);
  }

  /**
   *
   * @param event = event which called the notification service
   * @param data = data of event - look into event reference: https://docs.medusajs.com/development/events/events-list#order-events
   * @param attachmentGenerator = default = null
   */
  async sendNotification(
    event: string,
    data: any,
    attachmentGenerator: unknown
  ): Promise<{
    to: string;
    status: string;
    data: Record<string, unknown>;
  }> {
    if (event === "order.placed") {
      const order = await this.orderService_.retrieve(data.id, {
        relations: ["items", "customer", "shipping_address"],
      });
      // const cart = await this.cartService_.retrieve(order.cart_id);
      console.log(order, "order");
      await this.emailClient_.emails.send({
        from: "mail@natureme.life",
        to: order.email,
        subject: "Thank you for your order!",
        html: "Thank you for your order!",
      });

      return Promise.resolve({
        to: order.email,
        status: "done",
        data: {
          subject: "You placed a new order!",
          items: order.items,
        },
      });
    }
    return Promise.resolve(undefined);
  }

  resendNotification(
    notification: any,
    config: any,
    attachmentGenerator: unknown
  ): Promise<{
    to: string;
    status: string;
    data: Record<string, unknown>;
  }> {
    const to: string = config.to || notification.to;

    console.log("Notification resent");
    return Promise.resolve({
      to,
      status: "done",
      data: notification.data,
    });
  }
}
