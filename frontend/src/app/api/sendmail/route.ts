import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, subject, content } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "NatureMe <mail@natureme.life>",
      to,
      subject,
      text: content,
    });

    if (error) {
      throw new Error(error.message);
    }

    return Response.json({ data });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
