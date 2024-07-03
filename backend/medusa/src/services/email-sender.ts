import {
  AbstractNotificationService,
  CartService,
  Logger,
  Order,
  OrderService,
} from "@medusajs/medusa";
import { Resend } from "resend";
import EmailTemplate from "../email/EmailTemplate";

export default class EmailSenderService extends AbstractNotificationService {
  static identifier = "email-sender";
  protected orderService_: OrderService;
  protected cartService_: CartService;
  protected emailClient_: Resend;
  protected logger_: Logger;
  private fromEmail = `noreply${
    process.env.ENV !== "development" ? "+test" : ""
  }@natureme.life`;

  constructor(container, options) {
    super(container);
    this.orderService_ = container.orderService;
    this.cartService_ = container.cartService;
    this.logger_ = container.logger;
    this.emailClient_ = new Resend(process.env.RESEND_API_KEY);
  }

  private orderPlacedHandler = async (order: Order) => {
    await this.emailClient_.emails.send({
      from: this.fromEmail,
      to: order.email,
      subject: "NatureMe - Order Confirmation",
      react: EmailTemplate({ message: "Thank you for your order!", order }),
    });

    return Promise.resolve({
      to: order.email,
      status: "done",
      data: {
        subject: "NatureMe - Order Confirmation",
        items: order.items,
      },
    });
  };

  private orderShipmentCreatedHandler = async (order: Order) => {
    await this.emailClient_.emails.send({
      from: this.fromEmail,
      to: order.email,
      subject: "NatureMe - Order Shipped",
      react: EmailTemplate({ message: "We  have shipped your order!", order }),
    });

    return Promise.resolve({
      to: order.email,
      status: "done",
      data: {
        subject: "NatureMe - Order Shipped",
      },
    });
  };

  private orderRefundCratedHandler = async (order: Order) => {
    await this.emailClient_.emails.send({
      from: this.fromEmail,
      to: order.email,
      subject: "NatureMe - Order Refunded",
      react: EmailTemplate({ message: "We have refunded your order.", order }),
    });

    return Promise.resolve({
      to: order.email,
      status: "done",
      data: {
        subject: "NatureMe - Order Refunded",
        items: order.items,
      },
    });
  };

  async sendNotification(
    event: string,
    data: any,
    _: unknown
  ): Promise<{
    to: string;
    status: string;
    data: Record<string, unknown>;
  }> {
    const order = await this.orderService_.retrieve(data.id, {
      relations: ["items", "customer", "shipping_address"],
    });

    switch (event) {
      case "order.placed":
        return await this.orderPlacedHandler(order);
      case "order.shipment_created":
        return await this.orderShipmentCreatedHandler(order);
      case "order.refund_created":
        return await this.orderRefundCratedHandler(order);
      default:
        this.logger_.error(`Unknown event: ${event}`);
        break;
    }
  }

  resendNotification(
    notification: any,
    config: any,
    _: unknown
  ): Promise<{
    to: string;
    status: string;
    data: Record<string, unknown>;
  }> {
    const to: string = config.to || notification.to;

    return Promise.resolve({
      to,
      status: "done",
      data: notification.data,
    });
  }
}
