import { NextRequest, NextResponse } from "next/server";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getAssistantReply(message: string) {
  const trimmed = message.trim();
  if (!trimmed) {
    return "Hi 👋 I’m Shahaf’s assistant. Ask me about his projects, experience, or communities.";
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return "Hi 👋 I’m Shahaf’s portfolio assistant. You can also contact him on WhatsApp: https://wa.me/972556884247";
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are Shahaf’s portfolio assistant. Keep replies short, friendly, and in English. Mention WhatsApp contact only when necessary. Do not invent facts. If asked about GitHub, include https://github.com/shahcaf.",
          },
          { role: "user", content: trimmed },
        ],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      return "Hi 👋 I’m Shahaf’s assistant. Ask me about his projects, website work, bots, or communities.";
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === "string" && content.trim() ? content.trim() : "Hi 👋 I’m Shahaf’s assistant. Ask me about his projects, experience, or communities.";
  } catch {
    return "Hi 👋 I’m Shahaf’s assistant. Ask me about his projects, experience, or communities.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = formData.get("Body")?.toString() || "";
    if (!body) {
      return new NextResponse("", { status: 200 });
    }

    const reply = await getAssistantReply(body);

    return new NextResponse(`<Response><Message>${escapeXml(reply)}</Message></Response>`, {
      status: 200,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return new NextResponse(
      `<Response><Message>${escapeXml("Hi 👋 I’m Shahaf’s assistant. Ask me about his projects, experience, or communities.")}</Message></Response>`,
      {
        status: 200,
        headers: { "Content-Type": "text/xml; charset=utf-8" },
      },
    );
  }
}
