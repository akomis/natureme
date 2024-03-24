import { Resend } from 'resend';
import { ContactEmail } from '@/apps/shop/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { from, content } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'mail@natureme.com',
      to: ['akomis@protonmail.com'],
      subject: 'New email',
      html: '<p>tesdt</p>',
    });
    console.log('error: ', error);
    if (error) {
      throw new Error();
    }

    console.log(`Email sent from ${from}`);
    return Response.json({ data });
  } catch (error) {
    console.log(`Error senting email from ${from}`);

    return Response.json({ error });
  }
}
