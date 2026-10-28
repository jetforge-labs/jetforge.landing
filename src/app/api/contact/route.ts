import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildContactEmail, parseContactPayload } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { subject, text } = buildContactEmail(parsed.data);

    const { error } = await resend.emails.send({
      from: "Jetforge Labs Forms <forms@jetforgelabs.com>",
      to: "hello@jetforgelabs.com",
      subject,
      text,
      replyTo: parsed.data.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
