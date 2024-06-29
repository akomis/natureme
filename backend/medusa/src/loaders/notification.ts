import { Logger, MedusaContainer, NotificationService } from "@medusajs/medusa";

export default async (container: MedusaContainer): Promise<void> => {
  const logger = container.resolve<Logger>("logger");

  logger.info("Starting loader...");
  const notificationService = container.resolve<NotificationService>(
    "notificationService"
  );

  notificationService.subscribe("order.placed", "email-sender");
  notificationService.subscribe("order.shipment_created", "email-sender");
  notificationService.subscribe("order.refund_created", "email-sender");
};
