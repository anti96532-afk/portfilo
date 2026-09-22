import { NextRequest, NextResponse } from "next/server";

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
const requestTimestamps = new Map<string, number>();

function sanitizeString(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "local";
    const now = Date.now();
    const lastRequest = requestTimestamps.get(clientIp) ?? 0;

    if (now - lastRequest < 2500) {
      return NextResponse.json({ ok: false, message: "Please wait a moment before sending another message." }, { status: 429 });
    }

    requestTimestamps.set(clientIp, now);

    const body = await request.json();

    const name = sanitizeString(body?.name, 80);
    const email = sanitizeString(body?.email, 160).toLowerCase();
    const projectType = sanitizeString(body?.projectType, 60) || "General";
    const message = sanitizeString(body?.message, 1250);

    if (!name || !message || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, message: "Please provide a valid name, email, and message." }, { status: 400 });
    }

    if (message.length < 12) {
      return NextResponse.json({ ok: false, message: "Your message is too short." }, { status: 400 });
    }

    const outboundMessage = [
      "New portfolio inquiry",
      `Name: ${name}`,
      `Email: ${email}`,
      `Project Type: ${projectType}`,
      "Message:",
      message,
    ].join("\n");

    if (!discordWebhookUrl) {
      return NextResponse.json({ ok: false, message: "Discord notification is not configured." }, { status: 503 });
    }

    if (discordWebhookUrl) {
      try {
        const discordResponse = await fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Shahaf Portfolio",
            content: `<@1496146117526687755>\n\n${outboundMessage}`.slice(0, 1900),
          }),
        });

        if (!discordResponse.ok) {
          console.error("Discord webhook error:", discordResponse.status);
          return NextResponse.json({ ok: false, message: "Discord notification failed." }, { status: 502 });
        }
      } catch (error) {
        console.error("Discord notification error:", error);
        return NextResponse.json({ ok: false, message: "Discord notification failed." }, { status: 502 });
      }
    }

    return NextResponse.json({ ok: true, message: "Contact sent to Discord." });
  } catch (error) {
    console.error("Contact send error:", error);
    return NextResponse.json({ ok: false, message: "Could not send contact message." }, { status: 500 });
  }
}
