import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/lib/schema";
import { sendMail } from "@/lib/mailer";
import { coordinatorEmail, customerConfirmationEmail } from "@/lib/emailTemplates";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = orderSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const order = result.data;
  const coordinatorTo = process.env.COORDINATOR_EMAIL;

  if (!coordinatorTo) {
    console.error("COORDINATOR_EMAIL env var is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const [coordMail, custMail] = [coordinatorEmail(order), customerConfirmationEmail(order)];

    await Promise.all([
      sendMail({ to: coordinatorTo, subject: coordMail.subject, html: coordMail.html }),
      sendMail({ to: order.contactEmail, subject: custMail.subject, html: custMail.html }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to send order emails:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
