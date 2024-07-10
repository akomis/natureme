import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "next-sanity";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_ENV,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const fetchFromSanity = async (
  entity?: string,
  query?: string
): Promise<any[]> => {
  return await sanity.fetch(query ?? `*[_type == "${entity}"]`);
};

export const sendEmail = async (subject: string, content: string) => {
  const data = JSON.stringify({ subject, content });

  const response = await fetch("/api/sendmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
};

export const cn = function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const isProd = () => process.env.NODE_ENV === "production";

export const pastelColors = [
  "#F8E1E4", // pink
  "#E1E4F8", // blue
  "#E1F8E4", // green
  "#F8E1E8", // coral
  "#E4E1F8", // lavender
  "#F1E1F8", // violet
  "#E1F8F4", // teal
  "#F8E1EC", // rose
  "#E1F4F8", // sky blue
  "#F8E1E8", // coral
];

export const printPrice = (amount?: number | null) => {
  const formattedPrice = (amount ?? 0) / 100;
  const priceString = formattedPrice.toFixed(2);

  if (priceString.endsWith(".00")) {
    return `€${formattedPrice.toFixed(0)}`;
  } else {
    return `€${priceString}`;
  }
};

export const isPhoneValid = (phone: string) => {
  return /^\d{8}$/.test(phone);
};

export const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
