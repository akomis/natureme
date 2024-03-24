import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const sendEmail = async (from: string, content: string) => {
  const data = JSON.stringify({ from, content });

  try {
    const response = await fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {}
};

export const cn = function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const isProd = () => process.env.NODE_ENV === 'production';

export const getRandomPastelColor = () =>
  'hsl(' +
  360 * Math.random() +
  ',' +
  (25 + 70 * Math.random()) +
  '%,' +
  (85 + 10 * Math.random()) +
  '%)';
