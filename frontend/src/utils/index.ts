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

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  const data = JSON.stringify({ to, subject, content });

  try {
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
  } catch (error) {}
};

export const cn = function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const isProd = () => process.env.NODE_ENV === "production";

export const getRandomPastelColor = () =>
  "hsl(" +
  360 * Math.random() +
  "," +
  (25 + 70 * Math.random()) +
  "%," +
  (85 + 10 * Math.random()) +
  "%)";

export const printPrice = (amount: number) => `€${(amount / 100).toFixed(2)}`;
