import { NextRequest, NextResponse } from "next/server";

const supportedLanguages = ["en", "he", "fr"] as const;

const WHATSAPP_NUMBER = "972556884247";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const whatsappContactText = {
  en: `I don't have that information yet. You can contact Shahaf on WhatsApp: ${WHATSAPP_URL}`,
  he: `אין לי את המידע הזה כרגע. אפשר ליצור קשר עם שחף ב-WhatsApp: ${WHATSAPP_URL}`,
  fr: `Je n'ai pas encore cette information. Vous pouvez contacter Shahaf via WhatsApp : ${WHATSAPP_URL}`,
} as const;

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

function sanitizeInput(value: string, maxLength = 500) {
  return value.trim().slice(0, maxLength);
}

function generateReply(language: string, messages: ChatMessage[]) {
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user")?.text || "";
  const text = sanitizeInput(lastUserMessage, 500).toLowerCase();

  const fallback = whatsappContactText;

  if (!text) {
    return {
      en: "Hey 👋 I'm Shahaf's portfolio assistant. Have a question about Shahaf, his projects, experience, skills, or communities? Ask me anything.",
      he: "היי 👋 אני העוזר האישי של תיק העבודות של שחף. יש לך שאלה על שחף, הפרויקטים שלו, הניסיון שלו או הקהילות שלו? אפשר לשאול אותי הכל.",
      fr: "Salut 👋 Je suis l'assistant du portfolio de Shahaf. Une question sur Shahaf, ses projets, son expérience ou ses communautés ? Demandez-moi ce que vous voulez.",
    }[language] ?? fallback["en"];
  }

  const lowerText = text;

  if (lowerText.includes("logo web") || lowerText.includes("logo")) {
    return {
      en: "Logo Web was an early business idea that Shahaf had at age 7. It did not take off, and it became one of the reasons he decided to learn how to build his own ideas himself.",
      he: "Logo Web היה רעיון עסקי מוקדם של שחף כשהיה בן 7. הוא לא צלח, והפך לאחת הסיבות שבגללן החל ללמוד לבנות את הרעיונות שלו בעצמו.",
      fr: "Logo Web était une idée commerciale précoce de Shahaf à l'âge de 7 ans. Elle n'a pas décollé et c'est l'une des raisons pour lesquelles il a décidé d'apprendre à construire ses propres idées lui-même.",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("age") || lowerText.includes("7") || lowerText.includes("started") || lowerText.includes("journey")) {
    return {
      en: "Shahaf started becoming interested in development around age 7, after trying to create a business idea called Logo Web. After repeatedly asking other developers for help, he became motivated to learn how to build his ideas himself.",
      he: "שחף התחיל להתעניין בפיתוח בסביבות גיל 7, אחרי שניסה להקים רעיון עסקי בשם Logo Web. לאחר שביקש עזרה ממפתחים אחרים שוב ושוב, הוא התעודד ללמוד לבנות את הרעיונות שלו בעצמו.",
      fr: "Shahaf a commencé à s'intéresser au développement vers l'âge de 7 ans, après avoir tenté de créer une idée commerciale appelée Logo Web. Après avoir demandé de l'aide à plusieurs développeurs, il a décidé d'apprendre à construire ses propres idées lui-même.",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("who is shahaf") || (lowerText.includes("shahaf") && lowerText.includes("who"))) {
    return {
      en: "Shahaf Amram is a 14-year-old developer from Israel. He specializes in web development, bot development, and software development.",
      he: "שחף עמרם הוא מפתח בן 14 מישראל. הוא מתמחה בפיתוח אתרים, פיתוח בוטים ופיתוח תוכנה.",
      fr: "Shahaf Amram est un développeur de 14 ans originaire d'Israël. Il se spécialise dans le développement web, le développement de bots et le développement logiciel.",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("website") || lowerText.includes("web") || lowerText.includes("build") || lowerText.includes("develop")) {
    return {
      en: "Shahaf focuses on web development, creating polished and responsive websites and web applications. He also works on bot development and software tools.",
      he: "שחף מתמקד בפיתוח אתרים, ויוצר אתרים ויישומים responsives ומלוטשים. הוא גם עובד על פיתוח בוטים וכלים תוכנה.",
      fr: "Shahaf se concentre sur le développement web, en créant des sites et applications réactifs et soignés. Il travaille aussi sur le développement de bots et des outils logiciels.",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("bot") || lowerText.includes("discord")) {
    return {
      en: "Shahaf develops Discord bots, automation systems, moderation tools, and community-focused integrations.",
      he: "שחף מפתח בוטי Discord, מערכות אוטומציה, כלים לניהול קהילה ואינטגרציות שמיועדות לקהילות.",
      fr: "Shahaf développe des bots Discord, des systèmes d'automatisation, des outils de modération et des intégrations orientées communauté.",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("levibot") || lowerText.includes("lead developer")) {
    return {
      en: "Shahaf is the Lead Developer of LeviBot. He works on the bot's development and community-facing product direction.",
      he: "שחף הוא מפתח ראשי של LeviBot. הוא עובד על פיתוח הבוט והכיוון המוצר מול הקהילה.",
      fr: "Shahaf est le Lead Developer de LeviBot. Il travaille sur le développement du bot et la direction du produit visible par la communauté.",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("aerogrowth") || lowerText.includes("memberlyx")) {
    return {
      en: "Shahaf founded AeroGrowth and co-founded Memberlyx. AeroGrowth currently has around 517 members, and Memberlyx around 1,440 members.",
      he: "שחף ייסד את AeroGrowth ושיתף פעולה בהקמת Memberlyx. ל-AeroGrowth יש כיום כ־517 חברים, ול-Memberlyx כ־1,440 חברים.",
      fr: "Shahaf a fondé AeroGrowth et co-fondé Memberlyx. AeroGrowth compte actuellement environ 517 membres, et Memberlyx environ 1 440 membres.",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("github") || lowerText.includes("code") || lowerText.includes("projects")) {
    return {
      en: "Shahaf shares his work and experiments on GitHub: https://github.com/shahcaf",
      he: "שחף משתף את העבודה והניסויים שלו ב-GitHub: https://github.com/shahcaf",
      fr: "Shahaf partage son travail et ses expérimentations sur GitHub : https://github.com/shahcaf",
    }[language] ?? fallback["en"];
  }

  if (lowerText.includes("discord") || lowerText.includes("contact") || lowerText.includes("@r4ze083")) {
    return {
      en: "You can contact Shahaf on Discord: @r4ze083",
      he: "אפשר ליצור קשר עם שחף בדיסקורד: @r4ze083",
      fr: "Vous pouvez contacter Shahaf sur Discord : @r4ze083",
    }[language] ?? fallback["en"];
  }

  return fallback[language as keyof typeof fallback] ?? fallback.en;
}

async function getGroqReply(language: string, messages: ChatMessage[]) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return generateReply(language, messages);

  const promptLanguage = language === "he" ? "Hebrew" : language === "fr" ? "French" : "English";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
            content: `You are Shahaf's portfolio assistant. Answer as if you are helping visitors learn about Shahaf Amram, his projects, his journey, and his communities. Respond only in ${promptLanguage}. Keep answers friendly, short, helpful, and accurate. Do not invent facts. If the visitor asks for contact info, mention Discord @r4ze083. If they ask about GitHub, include https://github.com/shahcaf.`,
          },
          ...messages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        ],
      }),
      cache: "no-store",
    });

    if (!response.ok) return generateReply(language, messages);

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content === "string" && content.trim()) return content.trim();
    return generateReply(language, messages);
  } catch {
    return generateReply(language, messages);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const language = typeof body.language === "string" ? body.language.toLowerCase() : "en";
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!supportedLanguages.includes(language as (typeof supportedLanguages)[number])) {
      return NextResponse.json({ text: whatsappContactText.en }, { status: 400 });
    }

    if (messages.length > 20) {
      return NextResponse.json({ text: "Your conversation is too long. Please ask a shorter question." }, { status: 429 });
    }

    const text = await getGroqReply(language, messages as ChatMessage[]);
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ text: "I couldn't process that message. Please try again." }, { status: 400 });
  }
}
