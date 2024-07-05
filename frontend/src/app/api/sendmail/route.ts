import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { subject, content } = await request.json();

  const subaddressing = process.env.NODE_ENV === "production" ? "" : "+test";

  try {
    const { data, error } = await resend.emails.send({
      from: `contactus${subaddressing}@natureme.life`,
      to: process.env.CONTACT_EMAIL ?? "naturemesoaps@gmail.com",
      subject,
      text: content,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
