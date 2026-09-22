"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  Briefcase,
  Code2,
  Copy,
  ExternalLink,
  GitBranch as GithubIcon,
  Globe,
  Mail,
  MessageCircleMore,
  MessageSquareText,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

const langs = ["en", "he", "fr"] as const;
type Language = (typeof langs)[number];

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

type ThemeKey = "obsidian" | "graphite" | "verdant" | "emerald" | "bronze" | "midnight" | "silver" | "sapphire";

type ProjectDetail = {
  name: string;
  desc: string;
  href: string;
  category: "client" | "personal";
  role?: string;
  stack?: string;
  outcome?: string;
};

const createMessage = (role: ChatMessage["role"], text: string): ChatMessage => ({
  role,
  text,
});

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      expertise: "Expertise",
      work: "Work",
      github: "GitHub",
      journey: "Journey",
      contact: "Contact",
    },
    hero: {
      name: "Shahaf Amram",
      title: "Web Developer • Bot Developer • Software Developer",
      blurb: "14-year-old developer turning ideas into polished digital products.",
      explore: "Explore My Work",
      ask: "Ask My AI",
      github: "GitHub",
      contact: "Contact Me",
      status: "Available for new builds",
      badge: "Live build",
      founder: "Founder • Builder",
      products: "Products",
      location: "Israel",
      stack: "Web • Bots • Software",
    },
    about: {
      eyebrow: "It Started When I Was 7.",
      title: "The idea came before the skill.",
      stage1: "I had an idea.",
      stage2: "I needed developers to help me build it.",
      stage3: "I kept trying. No one built it for me.",
      stage4: "Logo Web failed.",
      stage5: "So I learned to build it myself.",
      leftLabels: [
        "I had an idea.",
        "LOGO WEB",
        "I needed developers to help me build it.",
        "COUNTLESS ATTEMPTS",
        "I kept trying. No one built it for me.",
        "Logo Web failed.",
      ],
      story:
        "I'm Shahaf Amram, a 14-year-old developer from Israel specializing in web development, bot development, and software development.",
      story2:
        "At age 7, I had an idea for a small business called Logo Web. I wanted to build it, but I did not know how.",
      story3:
        "I reached out to developers, asked for help, tried more than once and still no one built it for me. That failure changed everything.",
      story4:
        "Instead of waiting, I started learning how to build my own ideas. That curiosity turned into long-term practice, experimentation, and real projects.",
      story5:
        "Today I build websites, bots, software, and collaborative digital products, while continuing to create and learn.",
      timeline: "Age 7 → Today",
      ratingLabel: "Rate this portfolio",
      ratingSaved: "Thanks for the rating",
    },
    expertise: {
      title: "Expertise",
      web: "Web Development",
      webDesc: "Modern, responsive, visually polished websites and web applications.",
      bot: "Bot Development",
      botDesc: "Discord bots, automation systems, moderation tools, and community integrations.",
      soft: "Software Development",
      softDesc: "Practical tools, automation, and experimentation with new technology.",
      highlight: "Client Projects",
      highlight2: "AeroGrowth",
      highlight3: "Memberlyx",
    },
    services: {
      title: "What I build",
      intro: "I help founders, communities, and brands turn rough ideas into polished digital products.",
      web: { title: "Web products", text: "Modern landing pages, premium websites, and clean product experiences that feel ready for launch.", bullets: ["Brand-ready UI", "Responsive builds", "Fast iteration"] },
      community: { title: "Community systems", text: "Discord communities, bot systems, automations, and engagement tooling designed for real growth.", bullets: ["Bots & automation", "Moderation tools", "Member experience"] },
      software: { title: "Software tools", text: "Practical software and internal tools that remove friction and speed up day-to-day work.", bullets: ["Workflow automation", "Dashboards", "Custom tooling"] },
    },
    projects: {
      title: "Selected Work",
      client: "Client / Collaborative Work",
      personal: "Personal Work",
      builtTogether: "Built together with גיא שטרית (Guy Shitrit)",
      visit: "Visit Website",
      view: "View Project",
      join: "Join Community",
      lead: "Lead Developer",
      project01: "01 — גגות הזוהרים",
      project02: "02 — אלומי זוהר",
      project03: "03 — LeviBot",
      project04: "04 — Vexra Group",
      project05: "05 — AeroGrowth",
      clientDesc: "Client website and branding work built for a polished digital presence.",
      leviDesc: "Lead developer behind LeviBot",
      vexraDesc: "Brand and web showcase",
      aeroDesc: "Founder-facing community landing page",
    },
    founders: {
      title: "Founded & Co-Founded",
      aerogrowth: "AeroGrowth",
      founder: "Founder",
      memberlyx: "Memberlyx",
      cofounder: "Co-Founder",
      join: "Join AeroGrowth →",
      join2: "Join Memberlyx →",
      guns: "Open Guns.lol →",
      members: "~517 Members",
      members2: "~1,440 Members",
    },
    journey: {
      title: "Experience / Journey",
      age7: "Age 7 — Logo Web Idea",
      learn: "Started Learning Development",
      web: "Web Development",
      projects: "Real Client Projects",
      bot: "Bot & Software Development",
      aero: "Founded AeroGrowth",
      memberlyx: "Co-Founded Memberlyx",
      levi: "Lead Developer — LeviBot",
      build: "Still Building.",
    },
    numbers: {
      featured: "Featured Projects",
      community: "Combined Community Members",
      specialties: "Development Specialties",
      started: "Age Development Journey Started",
      current: "Current Age",
    },
    contact: {
      title: "Have an idea? Let's build it.",
      github: "GitHub",
      discord: "Discord",
      copy: "Copy Discord Username",
      copied: "Copied!",
      formName: "Name",
      formEmail: "Email",
      formType: "Project Type",
      formMessage: "Message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Your message has been drafted successfully.",
      error: "The notification could not be sent. Please try again.",
      options: ["Website", "Discord Bot", "Software", "Collaboration", "Other"],
    },
    footer: {
      title: "שחף עמרם — Developer",
      tag: "Building what's next.",
      rights: "© 2026 שחף עמרם. All rights reserved.",
    },
    cookies: {
      title: "A small privacy note",
      text: "This site uses local storage for preferences like language, ratings, and chat state. No advertising cookies are used.",
      accept: "Got it",
      decline: "Decline",
    },
    chat: {
      label: "Ask Shahaf AI",
      online: "AI Assistant Online",
      placeholder: "Ask about Shahaf, his projects, experience, or communities...",
      send: "Send",
      clear: "Clear",
      initial:
        "Hey 👋 I'm Shahaf's portfolio assistant. Have a question about Shahaf, his projects, experience, skills, or communities? Ask me anything.",
      suggest: ["Who is Shahaf?", "What is Logo Web?", "What does Shahaf build?", "Tell me about LeviBot"],
      error: "I don't have that information yet. You can ask Shahaf directly on Discord: @r4ze083.",
      copied: "Copied!",
      typing: "Thinking...",
    },
    githubSection: {
      title: "What I'm Building",
      subtitle: "Follow my code, experiments, and latest projects on GitHub.",
      cta: "Explore My GitHub →",
    },
    button: {
      explore: "Explore",
    },
  },
  he: {
    nav: {
      home: "בית",
      about: "אודות",
      expertise: "מומחיות",
      work: "עבודה",
      github: "GitHub",
      journey: "מסע",
      contact: "צור קשר",
    },
    hero: {
      name: "שחף עמרם",
      title: "מפתח אתרים • מפתח בוטים • מפתח תוכנה",
      blurb: "מפתח בן 14 שממיר רעיונות למוצרים דיגיטליים מלוטשים.",
      explore: "צפו בעבודותיי",
      ask: "שאל את הבוט שלי",
      github: "GitHub",
      contact: "צור קשר",
      status: "זמין לפרויקטים חדשים",
      badge: "בנייה פעילה",
      founder: "מייסד • בונה",
      products: "מוצרים",
      location: "ישראל",
      stack: "אתרים • בוטים • תוכנה",
    },
    about: {
      eyebrow: "הכל התחיל כשהייתי בן 7.",
      title: "הרעיון הגיע לפני הכישרון.",
      stage1: "הייתה לי idea.",
      stage2: "הייתי צריך מפתחים שיעזרו לי לבנות אותה.",
      stage3: "ניסיתי שוב ושוב. אף אחד לא בנה אותה בשבילי.",
      stage4: "Logo Web נכשל.",
      stage5: "אז למדתי לבנות אותה בעצמי.",
      leftLabels: [
        "הייתה לי רעיון.",
        "LOGO WEB",
        "הייתי צריך מפתחים שיעזרו לי לבנות אותה.",
        "ניסיונות רבים",
        "ניסיתי שוב ושוב. אף אחד לא בנה אותה בשבילי.",
        "Logo Web נכשל.",
      ],
      story: "אני שחף עמרם, מפתח בן 14 מישראל המתמחה בפיתוח אתרים, בוטים ותוכנה.",
      story2: "בגיל 7 היה לי רעיון לעסק קטן בשם Logo Web. רציתי לבנות אותו, אבל לא ידעתי איך.",
      story3: "פניתי למפתחים, ביקשתי עזרה, ניסיתי יותר מפעם אחת, ועדיין אף אחד לא בנה את זה בשבילי. הכישלון הזה שינה הכול.",
      story4: "במקום לחכות, החלטתי ללמוד לבנות את הרעיונות שלי בעצמי. הסקרנות הזו הפכה לתרגול, ניסויים ופרויקטים אמיתיים.",
      story5: "כיום אני בונה אתרים, בוטים, תוכנה ומוצרים דיגיטליים שיתופיים, תוך כדי המשך יצירה ולמידה.",
      timeline: "גיל 7 → היום",
      ratingLabel: "דרגו את תיק העבודות",
      ratingSaved: "תודה על הדירוג",
    },
    expertise: {
      title: "מומחיות",
      web: "פיתוח אתרים",
      webDesc: "אתרים ויישומים מודרניים, רספונסיביים ומלוטשים.",
      bot: "פיתוח בוטים",
      botDesc: "בוטים ל-Discord, אוטומציות, כלים לניהול קהילות ועם אינטגרציות.",
      soft: "פיתוח תוכנה",
      softDesc: "כלים מעשיים, אוטומציה וניסוי בטכנולוגיות חדשות.",
      highlight: "פרויקטי לקוחות",
      highlight2: "AeroGrowth",
      highlight3: "Memberlyx",
    },
    services: {
      title: "מה אני בונה",
      intro: "אני עוזר ליזמים, קהילות ומותגים להפוך רעיונות ראשוניים למוצרים דיגיטליים מלוטשים ומוכנים לשימוש.",
      web: { title: "אתרים ומוצרים דיגיטליים", text: "דפי נחיתה מודרניים, אתרי פרימיום וחוויות דיגיטליות נקיות שמרגישות מוכנות להשקה.", bullets: ["ממשק מקצועי ומוכן למותג", "התאמה מלאה למובייל", "פיתוח מהיר וגמיש"] },
      community: { title: "מערכות לקהילות", text: "קהילות Discord, בוטים, אוטומציות וכלים לשיפור הפעילות והצמיחה של הקהילה.", bullets: ["בוטים ואוטומציות", "כלי ניהול ומודרציה", "שיפור חוויית המשתמש"] },
      software: { title: "כלי תוכנה", text: "תוכנות וכלים מותאמים אישית שמייעלים תהליכים וחוסכים עבודה יומיומית.", bullets: ["אוטומציה של תהליכים", "לוחות בקרה", "כלים בהתאמה אישית"] },
    },
    projects: {
      title: "עבודות נבחרות",
      client: "עבודה לקוחות / שיתופית",
      personal: "עבודה אישית",
      builtTogether: "נבנה יחד עם גיא שטרית",
      visit: "בקר באתר",
      view: "הצג פרויקט",
      join: "הצטרף לקהילה",
      lead: "מפתח ראשי",
      project01: "01 — גגות הזוהרים",
      project02: "02 — אלומי זוהר",
      project03: "03 — LeviBot",
      project04: "04 — Vexra Group",
      project05: "05 — AeroGrowth",
      clientDesc: "אתר לקוח ועיצוב מותג שנבנו לנוכחות דיגיטלית מלוטשת.",
      leviDesc: "מפתח ראשי מאחורי LeviBot",
      vexraDesc: "תצוגת מותג ואתר",
      aeroDesc: "דף נחיתה לקהילה שמיועד למייסד",
    },
    founders: {
      title: "הקמה ושותפות",
      aerogrowth: "AeroGrowth",
      founder: "מייסד",
      memberlyx: "Memberlyx",
      cofounder: "שותף מייסד",
      join: "הצטרף ל-AeroGrowth →",
      join2: "הצטרף ל-Memberlyx →",
      guns: "פתח את Guns.lol →",
      members: "כ־517 חברים",
      members2: "כ־1,440 חברים",
    },
    journey: {
      title: "מסע והתנסות",
      age7: "גיל 7 — רעיון Logo Web",
      learn: "התחלתי ללמוד פיתוח",
      web: "פיתוח אתרים",
      projects: "פרויקטים אמיתיים ללקוחות",
      bot: "פיתוח בוטים ותוכנה",
      aero: "הקמתי את AeroGrowth",
      memberlyx: "הקמתי שותפות ב-Memberlyx",
      levi: "מפתח ראשי — LeviBot",
      build: "עדיין בונה.",
    },
    numbers: {
      featured: "פרויקטים מוצגים",
      community: "חברי קהילה משולבים",
      specialties: "תחומי התמחות",
      started: "גיל תחילת הדרך",
      current: "גיל נוכחי",
    },
    contact: {
      title: "יש לכם רעיון? בואו נבנה אותו.",
      github: "GitHub",
      discord: "Discord",
      copy: "העתק שם משתמש דיסקורד",
      copied: "הועתק!",
      formName: "שם",
      formEmail: "אימייל",
      formType: "סוג הפרויקט",
      formMessage: "הודעה",
      submit: "שלח הודעה",
      sending: "שולח...",
      success: "ההודעה נכתבה בהצלחה.",
      error: "לא ניתן לשלוח את ההתראה. נסו שוב.",
      options: ["אתר", "בוט Discord", "תוכנה", "שיתוף פעולה", "אחר"],
    },
    footer: {
      title: "שחף עמרם — מפתח",
      tag: "בונה את מה שבא הבא.",
      rights: "© 2026 שחף עמרם. כל הזכויות שמורות.",
    },
    cookies: {
      title: "הערת פרטיות קטנה",
      text: "האתר משתמש באחסון מקומי להעדפות כמו שפה, דירוגים ומצב הצ׳אט. אין שימוש בעוגיות פרסום.",
      accept: "הבנתי",
      decline: "דחה",
    },
    chat: {
      label: "שאל את Shahaf AI",
      online: "העוזר מקוון",
      placeholder: "שאל על שחף, הפרויקטים שלו, הניסיון או הקהילות...",
      send: "שלח",
      clear: "נקה",
      initial: "היי 👋 אני העוזר האישי של תיק העבודות של שחף. יש לך שאלה על שחף, הפרויקטים שלו, הניסיון שלו או הקהילות שלו? אפשר לשאול אותי הכל.",
      suggest: ["מי זה שחף?", "מה זה Logo Web?", "על מה שחף עובד?", "ספר על LeviBot"],
      error: "אין לי את המידע הזה כרגע. אפשר לשאול את שחף ישירות בדיסקורד: @r4ze083.",
      copied: "הועתק!",
      typing: "חושב...",
    },
    githubSection: {
      title: "מה אני בונה",
      subtitle: "עקבו אחר הקוד, הניסויים והפרויקטים האחרונים שלי ב-GitHub.",
      cta: "גלו את ה-GitHub שלי →",
    },
    button: {
      explore: "סייר",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      expertise: "Compétences",
      work: "Projets",
      github: "GitHub",
      journey: "Parcours",
      contact: "Contact",
    },
    hero: {
      name: "Shahaf Amram",
      title: "Développeur Web • Développeur de Bots • Développeur Logiciel",
      blurb: "Développeur de 14 ans qui transforme des idées en produits numériques soignés.",
      explore: "Explorer mes projets",
      ask: "Demander à l’IA",
      github: "GitHub",
      contact: "Contactez-moi",
      status: "Disponible pour de nouveaux projets",
      badge: "Projet en direct",
      founder: "Fondateur • Bâtisseur",
      products: "Produits",
      location: "Israël",
      stack: "Web • Bots • Logiciel",
    },
    about: {
      eyebrow: "Tout a commencé à 7 ans.",
      title: "L’idée est arrivée avant la compétence.",
      stage1: "J’avais une idée.",
      stage2: "J’avais besoin de développeurs pour m’aider à la construire.",
      stage3: "J’ai essayé plusieurs fois. Personne ne l’a construite pour moi.",
      stage4: "Logo Web a échoué.",
      stage5: "J’ai donc appris à la construire moi-même.",
      leftLabels: [
        "J’avais une idée.",
        "LOGO WEB",
        "J’avais besoin de développeurs pour m’aider à la construire.",
        "NOMBREUSES TENTATIVES",
        "J’ai essayé plusieurs fois. Personne ne l’a construite pour moi.",
        "Logo Web a échoué.",
      ],
      story: "Je suis Shahaf Amram, un développeur de 14 ans d’Israël spécialisé en développement web, développement de bots et développement logiciel.",
      story2: "À l’âge de 7 ans, j’avais une idée pour une petite entreprise appelée Logo Web. Je voulais la créer, mais je ne savais pas comment.",
      story3: "J’ai demandé de l’aide à des développeurs, j’ai essayé à plusieurs reprises, et personne ne l’a construite pour moi. Cet échec a tout changé.",
      story4: "Au lieu d’attendre, j’ai commencé à apprendre à construire mes propres idées. Cette curiosité est devenue pratique, expérimentation et projets concrets.",
      story5: "Aujourd’hui, je crée des sites web, des bots, des logiciels et des produits numériques collaboratifs, tout en continuant d’apprendre et de produire.",
      timeline: "Âge 7 → Aujourd’hui",
      ratingLabel: "Évaluez ce portfolio",
      ratingSaved: "Merci pour votre évaluation",
    },
    expertise: {
      title: "Compétences",
      web: "Développement Web",
      webDesc: "Sites et applications modernes, réactifs et visuellement soignés.",
      bot: "Développement de Bots",
      botDesc: "Bots Discord, automatisations, outils de modération et intégrations communautaires.",
      soft: "Développement Logiciel",
      softDesc: "Outils pratiques, automatisation et expérimentation autour des nouvelles technologies.",
      highlight: "Projets clients",
      highlight2: "AeroGrowth",
      highlight3: "Memberlyx",
    },
    services: {
      title: "Ce que je crée",
      intro: "J'aide les entrepreneurs, les communautés et les marques à transformer leurs idées en produits numériques modernes et aboutis.",
      web: { title: "Produits web", text: "Pages de destination modernes, sites premium et expériences numériques soignées, prêtes à être lancées.", bullets: ["Interfaces professionnelles", "Design responsive", "Développement rapide"] },
      community: { title: "Systèmes communautaires", text: "Communautés Discord, bots, automatisations et outils conçus pour améliorer l'engagement et accompagner la croissance.", bullets: ["Bots et automatisation", "Outils de modération", "Expérience des membres"] },
      software: { title: "Outils logiciels", text: "Logiciels pratiques et outils personnalisés permettant d'automatiser les tâches et d'améliorer le travail quotidien.", bullets: ["Automatisation des processus", "Tableaux de bord", "Outils sur mesure"] },
    },
    projects: {
      title: "Projets sélectionnés",
      client: "Travail client / collaboratif",
      personal: "Travail personnel",
      builtTogether: "Créé avec גיא שטרית (Guy Shitrit)",
      visit: "Voir le site",
      view: "Voir le projet",
      join: "Rejoindre la communauté",
      lead: "Lead Developer",
      project01: "01 — גגות הזוהרים",
      project02: "02 — אלומי זוהר",
      project03: "03 — LeviBot",
      project04: "04 — Vexra Group",
      project05: "05 — AeroGrowth",
      clientDesc: "Site client et travail de branding créé pour une présence digitale soignée.",
      leviDesc: "Lead developer derrière LeviBot",
      vexraDesc: "Branding et vitrine web",
      aeroDesc: "Landing page communautaire orientée fondateur",
    },
    founders: {
      title: "Fondations & co-fondations",
      aerogrowth: "AeroGrowth",
      founder: "Fondateur",
      memberlyx: "Memberlyx",
      cofounder: "Co-Fondateur",
      join: "Rejoindre AeroGrowth →",
      join2: "Rejoindre Memberlyx →",
      guns: "Ouvrir Guns.lol →",
      members: "~517 membres",
      members2: "~1 440 membres",
    },
    journey: {
      title: "Parcours",
      age7: "Âge 7 — Idée Logo Web",
      learn: "J’ai commencé à apprendre le développement",
      web: "Développement Web",
      projects: "Projets clients réels",
      bot: "Développement de Bots et Logiciels",
      aero: "J’ai fondé AeroGrowth",
      memberlyx: "J’ai co-fondé Memberlyx",
      levi: "Lead Developer — LeviBot",
      build: "Je continue à construire.",
    },
    numbers: {
      featured: "Projets en vedette",
      community: "Membres de communauté combinés",
      specialties: "Spécialités de développement",
      started: "Âge du début du parcours",
      current: "Âge actuel",
    },
    contact: {
      title: "Vous avez une idée ? Construisons-la.",
      github: "GitHub",
      discord: "Discord",
      copy: "Copier le pseudo Discord",
      copied: "Copié !",
      formName: "Nom",
      formEmail: "E-mail",
      formType: "Type de projet",
      formMessage: "Message",
      submit: "Envoyer le message",
      sending: "Envoi...",
      success: "Votre message a été préparé avec succès.",
      error: "La notification n’a pas pu être envoyée. Réessayez.",
      options: ["Site Web", "Bot Discord", "Logiciel", "Collaboration", "Autre"],
    },
    footer: {
      title: "Shahaf Amram — Développeur",
      tag: "Construire la suite.",
      rights: "© 2026 Shahaf Amram. Tous droits réservés.",
    },
    cookies: {
      title: "Petite note de confidentialité",
      text: "Ce site utilise le stockage local pour les préférences comme la langue, les évaluations et l’état du chat. Aucun cookie publicitaire n’est utilisé.",
      accept: "Compris",
      decline: "Refuser",
    },
    chat: {
      label: "Demander à Shahaf AI",
      online: "Assistant IA en ligne",
      placeholder: "Posez une question sur Shahaf, ses projets, son expérience ou ses communautés...",
      send: "Envoyer",
      clear: "Effacer",
      initial: "Salut 👋 Je suis l’assistant du portfolio de Shahaf. Une question sur Shahaf, ses projets, son expérience ou ses communautés ? Demandez-moi ce que vous voulez.",
      suggest: ["Qui est Shahaf ?", "Qu’est-ce que Logo Web ?", "Que construit Shahaf ?", "Parlez-moi de LeviBot"],
      error: "Je n’ai pas encore cette information. Vous pouvez demander directement à Shahaf sur Discord : @r4ze083.",
      copied: "Copié !",
      typing: "Réflexion...",
    },
    githubSection: {
      title: "Ce que je construis",
      subtitle: "Suivez mon code, mes expériences et mes derniers projets sur GitHub.",
      cta: "Explorer mon GitHub →",
    },
    button: {
      explore: "Explorer",
    },
  },
} as const;

const numbers = [
  { value: "5+", label: "Featured Projects" },
  { value: "1,900+", label: "Combined Community Members" },
  { value: "3", label: "Development Specialties" },
  { value: "7", label: "Age Development Journey Started" },
  { value: "14", label: "Current Age" },
];

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeKey>("obsidian");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 20 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "Website", message: "" });
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [projectFilter, setProjectFilter] = useState<"all" | "client" | "personal">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [githubRepos, setGithubRepos] = useState<Array<{ name: string; description: string; html_url: string; language: string | null; stargazers_count: number }>>([]);
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const t = useMemo(() => translations[lang], [lang]);
  const dir = lang === "he" ? "rtl" : "ltr";
  const themePalette = {
    obsidian: {
      background: "#090b0f",
      surface: "#111821",
      surfaceAlt: "#1a202b",
      accent: "#cbb89d",
      accentSoft: "rgba(203, 184, 157, 0.12)",
      text: "#f5f1ea",
      muted: "rgba(245,241,234,0.72)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(203,184,157,0.18), rgba(17,24,33,0.88))",
    },
    graphite: {
      background: "#0c0d0f",
      surface: "#171a1d",
      surfaceAlt: "#1d2126",
      accent: "#d4d0ca",
      accentSoft: "rgba(212, 208, 202, 0.12)",
      text: "#f5f3f1",
      muted: "rgba(245,243,241,0.72)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(212,208,202,0.14), rgba(12,13,15,0.9))",
    },
    verdant: {
      background: "#0d1613",
      surface: "#15211d",
      surfaceAlt: "#1d312b",
      accent: "#c9d7b9",
      accentSoft: "rgba(201, 215, 185, 0.14)",
      text: "#edf5ef",
      muted: "rgba(237,245,239,0.72)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(201,215,185,0.16), rgba(13,22,19,0.9))",
    },
    emerald: {
      background: "#0b1715",
      surface: "#12211d",
      surfaceAlt: "#183126",
      accent: "#a9c7b4",
      accentSoft: "rgba(169, 199, 180, 0.16)",
      text: "#edf8f2",
      muted: "rgba(237,248,242,0.74)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(169,199,180,0.14), rgba(11,23,21,0.9))",
    },
    bronze: {
      background: "#120d09",
      surface: "#1d1713",
      surfaceAlt: "#261d18",
      accent: "#d8b18a",
      accentSoft: "rgba(216, 177, 138, 0.16)",
      text: "#f7f0ea",
      muted: "rgba(247,240,234,0.72)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(216,177,138,0.15), rgba(18,13,9,0.9))",
    },
    midnight: {
      background: "#070b13",
      surface: "#0d1624",
      surfaceAlt: "#111d2f",
      accent: "#a5c8ff",
      accentSoft: "rgba(165, 200, 255, 0.14)",
      text: "#edf5ff",
      muted: "rgba(237,245,255,0.72)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(165,200,255,0.14), rgba(7,11,19,0.9))",
    },
    silver: {
      background: "#0b0d10",
      surface: "#171b20",
      surfaceAlt: "#1d242c",
      accent: "#dfe6ed",
      accentSoft: "rgba(223, 230, 237, 0.14)",
      text: "#f5f7fb",
      muted: "rgba(245,247,251,0.72)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(223,230,237,0.14), rgba(11,13,16,0.9))",
    },
    sapphire: {
      background: "#070d1a",
      surface: "#0d1b2f",
      surfaceAlt: "#12253d",
      accent: "#7dd3fc",
      accentSoft: "rgba(125, 211, 252, 0.14)",
      text: "#ebf8ff",
      muted: "rgba(235,248,255,0.72)",
      border: "rgba(255,255,255,0.10)",
      button: "linear-gradient(135deg, rgba(125,211,252,0.15), rgba(7,13,26,0.9))",
    },
  } as const;
  const activeTheme = themePalette[theme];
  const themeOptions = [
    { id: "obsidian", label: "Obsidian", dot: "#cbb89d" },
    { id: "graphite", label: "Graphite", dot: "#d4d0ca" },
    { id: "verdant", label: "Verdant", dot: "#c9d7b9" },
    { id: "emerald", label: "Emerald", dot: "#a9c7b4" },
    { id: "bronze", label: "Bronze", dot: "#d8b18a" },
    { id: "midnight", label: "Midnight", dot: "#a5c8ff" },
    { id: "silver", label: "Silver", dot: "#dfe6ed" },
    { id: "sapphire", label: "Sapphire", dot: "#7dd3fc" },
  ] as const;

  useEffect(() => {
    const saved = localStorage.getItem("shahaf-lang");
    const savedTheme = localStorage.getItem("shahaf-theme");
    const browserLang = navigator.language.toLowerCase();
    const detectedLanguage = saved && langs.includes(saved as Language)
      ? saved as Language
      : browserLang.startsWith("he")
        ? "he"
        : browserLang.startsWith("fr")
          ? "fr"
          : "en";

    window.setTimeout(() => {
      setMounted(true);
      setLang(detectedLanguage);
      if (savedTheme && Object.prototype.hasOwnProperty.call(themePalette, savedTheme)) {
        setTheme(savedTheme as ThemeKey);
      }
      setCookieNoticeOpen(localStorage.getItem("shahaf-cookie-choice") !== "saved");
      setTimeout(() => setIsLoading(false), 800);
    }, 250);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("shahaf-theme", theme);
  }, [mounted, theme]);

  useEffect(() => {
    fetch("https://api.github.com/users/shahcaf/repos?sort=updated&per_page=3")
      .then((response) => (response.ok ? response.json() : []))
      .then((repositories) => setGithubRepos(Array.isArray(repositories) ? repositories : []))
      .catch(() => setGithubRepos([]));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("shahaf-lang", lang);
  }, [mounted, lang, dir]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
      setShowBackToTop(window.scrollY > 600);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const sectionIds = ["home", "about", "expertise", "work", "github", "journey", "contact"];
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === "Escape") {
        setSelectedProject(null);
        setThemeMenuOpen(false);
        setNavOpen(false);
        setChatOpen(false);
        return;
      }
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        event.preventDefault();
        setChatOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    window.setTimeout(() => setMessages([createMessage("assistant", t.chat.initial)]), 0);
  }, [lang, t.chat.initial]);

  useEffect(() => {
    const savedRating = Number(localStorage.getItem("shahaf-portfolio-rating"));
    if (savedRating >= 1 && savedRating <= 5) window.setTimeout(() => setRating(savedRating), 0);
  }, []);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const copyDiscord = async () => {
    await navigator.clipboard.writeText("@r4ze083");
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const handleFormChange = (key: keyof typeof form, value: string) => {
    setSubmissionError(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmissionError(false);

    let notificationSucceeded = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.type,
          message: form.message,
        }),
      });
      notificationSucceeded = response.ok;
    } catch {
      notificationSucceeded = false;
    }

    setSubmitted(notificationSucceeded);
    setSubmissionError(!notificationSucceeded);
    if (notificationSucceeded) {
      setForm({ name: "", email: "", type: "Website", message: "" });
    }
    setSubmitting(false);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleChatSubmit = async (message = input) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const nextMessages: ChatMessage[] = [...messages, createMessage("user", trimmed)];
    setMessages(nextMessages);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang, messages: nextMessages }),
      });

      const data = await res.json();
      setMessages([...nextMessages, createMessage("assistant", data.text || t.chat.error)]);
    } catch {
      setMessages([...nextMessages, createMessage("assistant", t.chat.error)]);
    } finally {
      setTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([createMessage("assistant", t.chat.initial)]);
    setInput("");
    setTyping(false);
  };

  const saveRating = (value: number) => {
    setRating(value);
    localStorage.setItem("shahaf-portfolio-rating", String(value));
  };

  const closeCookieNotice = (choice: "saved" | "declined") => {
    localStorage.setItem("shahaf-cookie-choice", choice);
    setCookieNoticeOpen(false);
  };

  const projectFilterLabels = lang === "he"
    ? { all: "הכול", client: "לקוחות", personal: "אישי" }
    : lang === "fr"
      ? { all: "Tout", client: "Clients", personal: "Personnel" }
      : { all: "All work", client: "Client work", personal: "Personal work" };

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.expertise, href: "#expertise" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.github, href: "#github" },
    { label: t.nav.journey, href: "#journey" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const activeNumbers = numbers.map((item) => {
    const translatedLabel =
      lang === "he"
        ? item.label === "Featured Projects"
          ? "פרויקטים מוצגים"
          : item.label === "Combined Community Members"
            ? "חברי קהילה משולבים"
            : item.label === "Development Specialties"
              ? "תחומי התמחות"
              : item.label === "Age Development Journey Started"
                ? "גיל תחילת הדרך"
                : "גיל נוכחי"
        : lang === "fr"
          ? item.label === "Featured Projects"
            ? "Projets en vedette"
            : item.label === "Combined Community Members"
              ? "Membres de communauté combinés"
              : item.label === "Development Specialties"
                ? "Spécialités de développement"
                : item.label === "Age Development Journey Started"
                  ? "Âge du début du parcours"
                  : "Âge actuel"
          : item.label;

    return { ...item, label: translatedLabel };
  });

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#05070b]"
            style={{ backgroundColor: activeTheme.background }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_top,_rgba(168,85,247,0.12),transparent_32%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:38px_38px]" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-cyan-300/25"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-5 rounded-full border border-white/10"
                />
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/35 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_20%),rgba(7,11,18,0.8)] text-xl font-black tracking-[-0.14em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                  S
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.45 }}
                className="mt-8 text-center"
              >
                <div className="text-[10px] font-medium uppercase tracking-[0.38em] text-white/45">Loading</div>
                <div className="mt-3 text-2xl font-black tracking-[-0.06em] text-white">Shahaf Amram</div>
              </motion.div>

              <div className="mt-7 h-px w-40 overflow-hidden bg-white/10">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: ["-100%", "180%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
      dir={dir}
      onMouseMove={(event) => setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 })}
      className="min-h-screen antialiased"
      style={{
        backgroundColor: activeTheme.background,
        color: activeTheme.text,
        "--theme-accent": activeTheme.accent,
        "--theme-accent-soft": activeTheme.accentSoft,
      } as CSSProperties}
    >
      <div className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-white/5">
        <motion.div className="h-full origin-left" style={{ backgroundColor: activeTheme.accent }} animate={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(103,232,249,0.14), transparent 24%), radial-gradient(circle at top, rgba(120,119,198,0.22), transparent 30%), radial-gradient(circle at bottom right, rgba(63,189,255,0.18), transparent 25%)` }} />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-8 top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <header
        className="sticky top-0 z-50 border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.16)] backdrop-blur-xl"
        style={{
          backgroundColor: `${activeTheme.background}CC`,
          borderColor: activeTheme.border,
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="group flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-cyan-400/40 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_30%),linear-gradient(135deg,rgba(56,189,248,0.18),rgba(15,23,42,0.9))] shadow-[0_0_30px_rgba(56,189,248,0.35)] transition duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-[0_0_38px_rgba(56,189,248,0.58)]">
              <div className="absolute inset-1 rounded-full border border-cyan-300/60" />
              <div className="relative text-[11px] font-black tracking-[-0.12em] text-cyan-100">S</div>
            </div>
            <span className="hidden sm:inline transition group-hover:text-cyan-100">Shahaf</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/75 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "page" : undefined} className={`group relative py-2 transition hover:text-white ${activeSection === item.href.slice(1) ? "text-cyan-200" : ""}`}>
                {item.label}
                <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-cyan-300 transition duration-300 ${activeSection === item.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden items-center sm:flex">
              <button
                type="button"
                onClick={() => setThemeMenuOpen((current) => !current)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/25 hover:text-white"
                aria-label="Change site theme"
              >
                <span
                  className="h-3 w-3 rounded-full border border-white/20"
                  style={{ background: activeTheme.accent }}
                />
                <span className="uppercase tracking-[0.18em]">{theme}</span>
              </button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[min(520px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f17]/95 p-2 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                      {themeOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setTheme(option.id);
                            setThemeMenuOpen(false);
                          }}
                          className={`flex min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] transition ${
                            theme === option.id ? "bg-white text-[#070b13]" : "text-white/70 hover:text-white"
                          }`}
                        >
                          <span
                            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: option.dot }}
                          />
                          <span className="truncate">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 sm:flex">
              {langs.map((option) => (
                <button
                  key={option}
                  onClick={() => setLang(option)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    lang === option ? "bg-white text-[#070b13]" : "text-white/75 hover:text-white"
                  }`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setNavOpen((s) => !s)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              aria-label="Toggle navigation"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-[#05070b]/95 px-4 pb-4 lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-3 pt-4 text-sm text-white/80">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setNavOpen(false)} aria-current={activeSection === item.href.slice(1) ? "page" : undefined} className={`border-b border-white/5 py-3 transition last:border-0 ${activeSection === item.href.slice(1) ? "text-cyan-200" : "text-white/80"}`}>
                    {item.label}
                  </a>
                ))}
                <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                  <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Theme</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {themeOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setTheme(option.id)}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[10px] font-medium uppercase tracking-[0.14em] transition ${
                          theme === option.id ? "bg-white text-[#070b13]" : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: option.dot }} />
                        <span className="truncate">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
                  {langs.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setLang(option);
                        setNavOpen(false);
                      }}
                      className={`flex-1 rounded-full px-3 py-2 text-xs font-medium ${
                        lang === option ? "bg-white text-[#070b13]" : "text-white/75"
                      }`}
                    >
                      {option.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="home" className="relative">
        <section className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] font-medium tracking-[0.22em] text-cyan-200 uppercase sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hero.status}
            </div>
            <h1 className="max-w-2xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white sm:text-6xl xl:text-[6.2rem]">
              {t.hero.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg font-medium text-white/80 sm:text-xl">{t.hero.title}</p>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg">{t.hero.blurb}</p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white via-cyan-100 to-cyan-200 px-6 py-3 text-sm font-semibold text-[#070b13] shadow-[0_16px_30px_rgba(125,211,252,0.15)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(125,211,252,0.2)]">
                {t.hero.explore}
                <ArrowRight className="h-4 w-4" />
              </a>
              <button onClick={() => setChatOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-400/10">
                <MessageSquareText className="h-4 w-4" />
                {t.hero.ask}
              </button>
              <a href="https://github.com/shahcaf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06]">
                <GithubIcon className="h-4 w-4" />
                {t.hero.github}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-white/55">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"><Globe className="h-4 w-4 text-cyan-200" /> {t.hero.location}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{t.hero.stack}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative flex items-center justify-center">
            <div className="relative h-[420px] w-full max-w-[540px]">
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="absolute inset-6 rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),transparent_40%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_30px_90px_rgba(13,20,34,0.8)] backdrop-blur-xl"
              />
              <div className="absolute left-12 top-12 h-56 w-56 rounded-full border border-cyan-300/30 bg-[radial-gradient(circle,_rgba(56,189,248,0.5),rgba(56,189,248,0.06)_30%,transparent_60%)] blur-2xl" />
              <div className="absolute right-16 top-24 h-52 w-52 rounded-full border border-violet-400/30 bg-[radial-gradient(circle,_rgba(167,139,250,0.5),transparent_60%)] blur-2xl" />
              <div className="absolute inset-x-10 bottom-10 h-40 rounded-[2rem] border border-white/10 bg-[#0d1320]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg" />

              <motion.div
                animate={{ rotateX: [14, 18, 14], rotateY: [-18, 20, -18], y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                whileHover={{ scale: 1.03, rotateY: 8, rotateX: 10 }}
                className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[34%] border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(93,173,255,0.14),rgba(148,163,184,0.06))] shadow-[0_24px_60px_rgba(56,189,248,0.18)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-4 rounded-[30%] border border-dashed border-cyan-300/45" />
                <div className="absolute inset-10 rounded-[28%] border border-violet-300/30" />
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5" />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-100/90">
                  <span>WEB</span>
                  <span>BOTS</span>
                  <span>SOFTWARE</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="absolute bottom-16 left-12 rounded-2xl border border-white/10 bg-[#0c1220]/80 px-4 py-3 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {t.hero.badge}
                </div>
                <div className="mt-3 text-xl font-semibold">{t.hero.founder}</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="absolute right-8 top-10 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70 backdrop-blur-md"
              >
                <span className="text-cyan-300">03</span> <span className="text-white/50">—</span> {t.hero.products}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="absolute bottom-8 right-8 w-44 rounded-2xl border border-emerald-300/20 bg-[#07130f]/80 p-3 shadow-[0_0_30px_rgba(52,211,153,0.12)] backdrop-blur-md"
              >
                <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                  <span>Live system</span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
                </div>
                <div className="mt-3 flex h-8 items-end gap-1.5">
                  {[18, 28, 22, 36, 30, 44, 34, 48, 40, 54, 46, 62].map((height, index) => (
                    <motion.span
                      key={index}
                      animate={{ height: [`${height}%`, `${Math.max(18, height - 18)}%`, `${height}%`] }}
                      transition={{ repeat: Infinity, duration: 1.8 + index * 0.05, ease: "easeInOut" }}
                      className="w-1 rounded-full bg-emerald-300/70"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-white/50">Building in public</div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <div className="overflow-hidden border-y border-white/10 bg-white/[0.025] py-3">
          <motion.div
            animate={{ x: [0, -420] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="flex min-w-max items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45"
          >
            {["Web experiences", "Discord systems", "Automation", "Product thinking", "Community tools", "Web experiences", "Discord systems", "Automation"].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-8">
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
              </span>
            ))}
          </motion.div>
        </div>

        <section className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(120deg,rgba(9,22,34,0.9),rgba(12,10,25,0.84))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-7"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200/75">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> {t.hero.status}</span>
                  <span className="h-px w-8 bg-white/15" />
                  <span>SH / 2026</span>
                </div>
                <h2 className="mt-4 max-w-xl text-2xl font-black tracking-[-0.05em] text-white sm:text-4xl">{t.hero.title}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">{t.hero.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[t.hero.stack, t.expertise.highlight, t.expertise.highlight2, t.expertise.highlight3].map((item, index) => (
                    <motion.span key={`${item}-${index}`} whileHover={{ y: -3, scale: 1.04 }} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/70 transition hover:border-cyan-300/30 hover:text-cyan-100">{item}</motion.span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a href="#work" className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.07]">
                  <div className="text-3xl font-black tracking-[-0.06em] text-white">05+</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/45">{t.projects.title}</div>
                  <ArrowRight className="mt-5 h-4 w-4 text-cyan-300 transition group-hover:translate-x-1" />
                </a>
                <button onClick={() => setChatOpen(true)} className="group rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-left transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-300/[0.12]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200"><MessageSquareText className="h-4 w-4" /></div>
                  <div className="mt-4 text-sm font-semibold text-white">{t.hero.ask}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100/50">{t.chat.online}</div>
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">
                <span className="h-px w-10 bg-cyan-300/70" />
                <span>02 / 09</span>
              </div>
              <p className="mt-4 max-w-xl text-2xl font-black tracking-[-0.05em] text-white sm:text-4xl">{t.about.eyebrow}</p>
            </div>
            <div className="max-w-xs text-sm leading-6 text-white/45">One idea, many attempts, and a decision to learn the whole stack.</div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1017]/90 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-xs">
                <span>{t.about.timeline}</span>
                <ArrowRight className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="relative mt-8 space-y-5 before:absolute before:bottom-2 before:left-[0.36rem] before:top-2 before:w-px before:bg-white/10">
                {(t.about.leftLabels || [
                  t.about.stage1,
                  "LOGO WEB",
                  t.about.stage2,
                  "COUNTLESS ATTEMPTS",
                  t.about.stage3,
                  t.about.stage4,
                ]).map((item, index) => (
                  <motion.div key={item + index} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group relative flex items-center gap-4 pl-6 text-sm leading-6 text-white/80">
                    <div className="absolute left-0 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)] transition duration-300 group-hover:scale-150 group-hover:bg-white" />
                    <span className="transition duration-300 group-hover:text-cyan-100">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-8">
                <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">{t.about.title}</h2>
                <div className="mt-8 space-y-4 text-base leading-8 text-white/72 sm:text-lg">
                  {[t.about.story, t.about.story2, t.about.story3, t.about.story4, t.about.story5].map((story, index) => (
                    <p key={story} className={index === 0 ? "text-white/90" : undefined}>{story}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="rounded-[2rem] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(15,23,42,0.2))] p-6 shadow-[0_18px_55px_rgba(34,211,238,0.08)] sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300 sm:text-xs">{t.about.stage5}</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">Web • Bots • Software</h3>
                  </div>
                  <div className="text-right">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/45 sm:text-xs">{rating ? t.about.ratingSaved : t.about.ratingLabel}</div>
                    <div className="flex justify-end gap-1" onMouseLeave={() => setRatingHover(0)}>
                      {[1, 2, 3, 4, 5].map((value) => {
                        const filled = value <= (ratingHover || rating);
                        return (
                          <button
                            key={value}
                            type="button"
                            aria-label={`${t.about.ratingLabel}: ${value}/5`}
                            onMouseEnter={() => setRatingHover(value)}
                            onFocus={() => setRatingHover(value)}
                            onBlur={() => setRatingHover(0)}
                            onClick={() => saveRating(value)}
                            className="rounded-md p-1 text-cyan-300 transition duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
                          >
                            <Star className={`h-5 w-5 transition ${filled ? "fill-cyan-300 text-cyan-200" : "text-white/25"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    t.expertise.highlight,
                    t.expertise.highlight2,
                    t.expertise.highlight3,
                  ].map((item, index) => (
                    <motion.div key={item} whileHover={{ y: -4, scale: 1.02 }} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/75 transition duration-200 hover:border-cyan-300/30 hover:bg-cyan-300/[0.05] hover:text-cyan-100">
                      <span className="mb-2 block font-mono text-[10px] text-cyan-300/70">0{index + 1}</span>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="expertise" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">
                <span className="h-px w-10 bg-cyan-300/70" />
                <span>03 / 09</span>
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white sm:text-6xl">{t.expertise.title}</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">A practical stack for turning rough ideas into useful digital products.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: t.expertise.web, desc: t.expertise.webDesc, icon: <Code2 className="h-5 w-5" />, index: "01", accent: "cyan", level: "92%" },
              { title: t.expertise.bot, desc: t.expertise.botDesc, icon: <Bot className="h-5 w-5" />, index: "02", accent: "violet", level: "86%" },
              { title: t.expertise.soft, desc: t.expertise.softDesc, icon: <Briefcase className="h-5 w-5" />, index: "03", accent: "emerald", level: "78%" },
            ].map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, rotateX: 2, rotateY: index === 1 ? -2 : 2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),transparent_35%),rgba(255,255,255,0.02)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] [transform-style:preserve-3d]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl transition duration-500 group-hover:bg-cyan-300/25" />
                <div className="relative flex items-center justify-between text-[10px] font-mono text-white/35">
                  <span>{card.index}</span>
                  <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> active</span>
                </div>
                <div className="relative mb-8 mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-300 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {card.icon}
                </div>
                <h3 className="relative text-2xl font-semibold tracking-[-0.04em] text-white">{card.title}</h3>
                <p className="relative mt-5 min-h-14 text-base leading-7 text-white/70">{card.desc}</p>
                <div className="relative mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40"><span>Focus</span><span className="h-px flex-1 bg-white/10" /><span className="text-cyan-200">{card.level}</span></div>
                <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: card.level }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + index * 0.12 }} className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" /></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">
                <span className="h-px w-10 bg-cyan-300/70" />
                <span>03.5 / 09</span>
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white sm:text-6xl">{t.services.title}</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">{t.services.intro}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { ...t.services.web, accent: "cyan" },
              { ...t.services.community, accent: "violet" },
              { ...t.services.software, accent: "emerald" },
            ].map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(11,17,25,0.9))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
              >
                <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${service.accent === "cyan" ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-200" : service.accent === "violet" ? "border-violet-300/30 bg-violet-400/10 text-violet-200" : "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"}`}>
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-black tracking-[-0.05em] text-white">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-white/70">{service.text}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,25,1),rgba(15,23,42,0.88))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.22)] sm:p-8">
              <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-300">
                <span className="h-px w-8 bg-cyan-300/70" />
                Featured build
              </div>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">AeroGrowth community launch</h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
                I helped shape a founder-facing community presence that combined identity, launch messaging, and a smoother member experience. The result was a stronger digital front for a growing online community.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "517+", label: "members" },
                  { value: "2 weeks", label: "launch window" },
                  { value: "1 system", label: "community stack" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <div className="text-2xl font-black tracking-[-0.05em] text-white">{stat.value}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/45">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://discord.gg/T8e8u28cZp" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070b13]">View community</a>
                <a href="https://shahcaf.github.io/Aerogrowth/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">See landing page</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} className="rounded-[2rem] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(9,14,20,0.92))] p-6 shadow-[0_20px_60px_rgba(34,211,238,0.08)] sm:p-8">
              <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300">Client feedback</div>
              <blockquote className="mt-5 text-xl leading-9 text-white/90">
                “Shahaf brings a rare mix of speed, clarity, and product thinking. He understands both the user experience and the actual systems behind it.”
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-bold text-cyan-100">S</div>
                <div>
                  <div className="font-semibold text-white">Shahaf Amram</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/45">Founder • Builder</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase"><span className="h-px w-10 bg-cyan-300/70" /><span>04 / 09</span></div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white sm:text-6xl">{t.projects.title}</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">A selection of interfaces, systems, and communities brought from idea to launch.</p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {(["all", "client", "personal"] as const).map((filter) => (
              <button key={filter} type="button" onClick={() => setProjectFilter(filter)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${projectFilter === filter ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white"}`}>
                {projectFilterLabels[filter]}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            <div className={projectFilter === "personal" ? "hidden" : ""}>
              <h3 className="mb-6 text-xl font-semibold text-white/90">{t.projects.client}</h3>
              <div className="mb-5 flex items-center gap-3 text-sm text-white/60"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />{t.projects.builtTogether}</div>
              <div className="grid gap-6">
                {[{ name: t.projects.project01, href: "https://www.gagot-hazoharim.co.il/", image: "https://images.unsplash.com/photo-1503387762-59252b7c9c2a?auto=format&fit=crop&w=1200&q=85" }, { name: t.projects.project02, href: "https://www.alumi-zohar.co.il/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85" }].map((project, index) => (
                  <motion.article key={project.name} onClick={() => setSelectedProject({ name: project.name, desc: t.projects.clientDesc, href: project.href, category: "client", role: "Web & brand development", stack: "Next.js · Responsive UI", outcome: "A clearer, more polished digital presence for the client." })} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, scale: 1.01 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b111a] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
                    <div className="grid gap-6 p-4 md:grid-cols-[1.2fr_0.8fr] md:p-6">
                      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,#111827,#0f172a_45%,#0b1120)] p-4">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          <span className="ml-4 text-[10px] uppercase tracking-[0.2em] text-white/40">project {index + 1}</span>
                        </div>
                        <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.15),transparent_30%),linear-gradient(180deg,#0d1320,#090d14)] p-4">
                          <div className="group/image relative mb-4 h-48 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_70%_20%,rgba(103,232,249,0.28),transparent_20%),linear-gradient(135deg,#10253a,#07111e_55%,#050910)]">
                            <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-cyan-300/15 transition duration-700 group-hover/image:scale-125" />
                            <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-cyan-300/20 transition duration-700 group-hover/image:rotate-45" />
                            <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/15 bg-[#07111e]/75 p-4 backdrop-blur-sm transition duration-500 group-hover/image:border-cyan-300/35">
                              <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/70">Digital presence</div>
                              <div className="mt-2 text-lg font-semibold text-white">{project.name}</div>
                              <div className="mt-3 h-1 w-2/3 rounded-full bg-cyan-300/50" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-1/3 rounded-full bg-white/12" />
                            <div className="h-2.5 w-full rounded-full bg-white/8" />
                            <div className="h-2.5 w-5/6 rounded-full bg-white/8" />
                            <div className="h-2.5 w-4/6 rounded-full bg-white/8" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <span className="text-xs uppercase tracking-[0.26em] text-cyan-300">{index + 1}</span>
                        <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">{project.name}</h3>
                        <p className="mt-4 text-white/65">{t.projects.clientDesc}</p>
                        <a href={project.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:border-cyan-300/70">
                          {t.projects.visit}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className={projectFilter === "client" ? "hidden" : ""}>
              <h3 className="mb-6 text-xl font-semibold text-white/90">{t.projects.personal}</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                {[{ name: t.projects.project03, desc: t.projects.leviDesc, href: "https://levibot-nine.vercel.app/", image: "/8263689cdc32cef0e9b071fbd700e6ef.png", community: "https://discord.gg/6fv7vpUR7h", cta1: t.projects.view, cta2: t.projects.join }, { name: t.projects.project04, desc: t.projects.vexraDesc, href: "https://vexragroup.netlify.app/", visual: "console", cta1: t.projects.view }, { name: t.projects.project05, desc: t.projects.aeroDesc, href: "https://shahcaf.github.io/Aerogrowth/", image: "/de23298bfa67ec1092d4df3cec2c9bd1.png", community: "https://discord.gg/T8e8u28cZp", cta1: t.projects.view }].map((project) => (
                  <motion.article key={project.name} onClick={() => setSelectedProject({ name: project.name, desc: project.desc, href: project.href, category: "personal", role: project.name.includes("LeviBot") ? "Lead Developer" : project.name.includes("AeroGrowth") ? "Founder & Product Builder" : "Product & web development", stack: project.name.includes("LeviBot") ? "Discord · Automation · Web" : "Brand · Web · Community systems", outcome: "A focused product experience designed to be clear, useful, and ready to grow." })} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,25,0.95),rgba(8,11,17,0.9))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition duration-300 hover:border-cyan-300/30">
                    <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,#0b1324,#111827_45%,#0a111b)] p-4">
                      <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-4">{project.name}</span>
                      </div>
                      <div className="relative h-48 overflow-hidden rounded-[1.1rem]">
                        {project.visual === "console" ? (
                          <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_80%_20%,rgba(103,232,249,0.3),transparent_22%),linear-gradient(135deg,#121b32,#080c18)] p-5">
                            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border border-cyan-300/20 animate-[spin_16s_linear_infinite]" />
                            <div className="absolute -right-2 -top-8 h-32 w-32 rounded-full border border-violet-300/20 animate-[spin_11s_linear_infinite_reverse]" />
                            <div className="relative h-full rounded-xl border border-white/15 bg-[#070b13]/75 p-3 shadow-2xl backdrop-blur-sm">
                              <div className="flex items-center gap-1.5 border-b border-white/10 pb-2"><span className="h-2 w-2 rounded-full bg-rose-400" /><span className="h-2 w-2 rounded-full bg-amber-300" /><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="ml-auto h-2 w-10 rounded-full bg-cyan-300/30" /></div>
                              <div className="mt-4 grid grid-cols-[0.7fr_1.3fr] gap-3"><div className="space-y-2"><div className="h-2 w-4/5 rounded bg-violet-300/40" /><div className="h-2 w-full rounded bg-white/10" /><div className="h-2 w-3/5 rounded bg-white/10" /><div className="mt-5 h-16 rounded-lg bg-cyan-300/10" /></div><div className="space-y-2"><div className="h-16 rounded-lg bg-gradient-to-br from-cyan-300/30 to-violet-400/20" /><div className="h-2 w-full rounded bg-white/10" /><div className="h-2 w-2/3 rounded bg-white/10" /></div></div>
                            </div>
                          </div>
                        ) : (
                          <><Image src={project.image ?? "/window.svg"} alt={project.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-75 transition duration-700 group-hover:scale-110 group-hover:opacity-100" /><div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-transparent to-violet-300/10" /></>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.05em] text-white">{project.name}</h3>
                        <p className="mt-2 text-sm text-white/65">{project.desc}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:border-cyan-300/40 hover:bg-cyan-300/[0.05]">
                        {project.cta1}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      {project.community && (
                        <a href={project.community} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-200 transition duration-200 hover:bg-cyan-400/15">
                          {t.projects.join}
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase"><span className="h-px w-10 bg-cyan-300/70" /><span>06 / 09</span></div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white sm:text-6xl">{t.founders.title}</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">Communities grow when product, identity, and people move in the same direction.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(135deg,#0c1a2a,#071019)] p-6 shadow-[0_22px_65px_rgba(0,0,0,0.24)] sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-cyan-300/15 transition duration-700 group-hover:scale-125" />
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-cyan-300/20 transition duration-700 group-hover:rotate-45" />
              <div className="relative flex items-center justify-between"><p className="text-xs uppercase tracking-[0.26em] text-cyan-300">{t.founders.founder}</p><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-200">active</span></div>
              <h3 className="relative mt-5 text-4xl font-black tracking-[-0.05em] text-white">{t.founders.aerogrowth}</h3>
              <div className="relative mt-8 flex items-end gap-3">
                <motion.span initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-6xl font-black tracking-[-0.06em] text-white">~517</motion.span>
                <span className="pb-2 text-white/60">{t.founders.members}</span>
              </div>
              <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: "68%" }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full bg-cyan-300" /></div>
              <div className="relative mt-8 flex flex-wrap gap-3">
                <a href="https://discord.gg/T8e8u28cZp" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070b13] transition hover:-translate-y-1">
                  {t.founders.join}
                </a>
                <a href="https://guns.lol/aerogrowth" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-400/15">
                  {t.founders.guns}
                </a>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[linear-gradient(135deg,#191329,#0d0b17)] p-6 shadow-[0_22px_65px_rgba(0,0,0,0.24)] sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-violet-300/15 transition duration-700 group-hover:scale-125" />
              <div className="relative flex items-center justify-between"><p className="text-xs uppercase tracking-[0.26em] text-violet-300">{t.founders.cofounder}</p><span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-violet-200">growing</span></div>
              <h3 className="relative mt-5 text-4xl font-black tracking-[-0.05em] text-white">{t.founders.memberlyx}</h3>
              <div className="relative mt-8 flex items-end gap-3">
                <motion.span initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-6xl font-black tracking-[-0.06em] text-white">~1,440</motion.span>
                <span className="pb-2 text-white/60">{t.founders.members2}</span>
              </div>
              <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: "88%" }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full bg-violet-300" /></div>
              <a href="https://discord.gg/J5uc3p9vp" target="_blank" rel="noreferrer" className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/15 px-5 py-3 text-sm font-semibold text-violet-100 transition hover:-translate-y-1 hover:bg-violet-500/25">
                {t.founders.join2}
              </a>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(17,24,39,0.9),rgba(8,12,22,0.94))] p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-cyan-300">LeviBot</p>
                <h3 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white">LeviBot</h3>
                <p className="mt-3 text-white/70">Lead Developer</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://levibot-nine.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070b13]">
                  Explore LeviBot
                </a>
                <a href="https://discord.gg/6fv7vpUR7h" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="github" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(9,13,20,0.88))] p-6 sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-cyan-300">GitHub</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">{t.githubSection.title}</h3>
                <p className="mt-4 max-w-xl text-white/70">{t.githubSection.subtitle}</p>
              </div>
              <a href="https://github.com/shahcaf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-white/20">
                <GithubIcon className="h-4 w-4" />
                {t.githubSection.cta}
              </a>
            </div>
            {githubRepos.length > 0 && (
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {githubRepos.map((repo) => (
                  <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]">
                    <div className="flex items-center justify-between gap-3"><span className="truncate font-semibold text-white">{repo.name}</span><GithubIcon className="h-4 w-4 shrink-0 text-cyan-300" /></div>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/50">{repo.description || "Open-source experiment by Shahaf."}</p>
                    <div className="mt-4 flex gap-3 text-[10px] uppercase tracking-[0.15em] text-white/40"><span>{repo.language || "Code"}</span><span>★ {repo.stargazers_count}</span></div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">
                <span className="h-px w-10 bg-cyan-300/70" />
                <span>09 / 09</span>
              </div>
              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.06em] text-white sm:text-6xl">{t.journey.title}</h2>
            </div>
            <div className="max-w-xs text-sm leading-6 text-white/45">From the first idea to the systems being built today.</div>
          </div>
          <div className="relative space-y-5 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-300 before:via-blue-400/40 before:to-transparent sm:space-y-8 sm:before:left-1/2">
            {[
              t.journey.age7,
              t.journey.learn,
              t.journey.web,
              t.journey.projects,
              t.journey.bot,
              t.journey.aero,
              t.journey.memberlyx,
              t.journey.levi,
              t.journey.build,
            ].map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.45, delay: index * 0.04 }} className={`group relative flex ${index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}>
                <div className="ml-10 sm:ml-0 sm:w-1/2 sm:px-8">
                  <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/35 group-hover:bg-cyan-300/[0.06] group-hover:shadow-[0_15px_45px_rgba(34,211,238,0.1)]">
                    <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-cyan-300/20" />
                    <div className="relative flex items-start gap-4">
                      <span className="font-mono text-xs text-cyan-300/70">0{index + 1}</span>
                      <span className="text-sm leading-6 text-white/85">{item}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/50 bg-[#070b13] shadow-[0_0_18px_rgba(34,211,238,0.18)] sm:left-1/2 sm:-translate-x-1/2">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 transition group-hover:scale-150 group-hover:bg-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-white/40">
            <span className="h-px w-10 bg-white/20" />
            <span>At a glance</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {activeNumbers.map((item, index) => {
              const accents = [
                { border: "hover:border-cyan-300/30", glow: "bg-cyan-400/10 group-hover:bg-cyan-400/25", dot: "bg-cyan-300", track: "bg-cyan-300/10" },
                { border: "hover:border-violet-300/30", glow: "bg-violet-400/10 group-hover:bg-violet-400/25", dot: "bg-violet-300", track: "bg-violet-300/10" },
                { border: "hover:border-emerald-300/30", glow: "bg-emerald-400/10 group-hover:bg-emerald-400/25", dot: "bg-emerald-300", track: "bg-emerald-300/10" },
                { border: "hover:border-amber-300/30", glow: "bg-amber-400/10 group-hover:bg-amber-400/25", dot: "bg-amber-300", track: "bg-amber-300/10" },
                { border: "hover:border-rose-300/30", glow: "bg-rose-400/10 group-hover:bg-rose-400/25", dot: "bg-rose-300", track: "bg-rose-300/10" },
              ];
              const accent = accents[index];
              return (
              <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45, delay: index * 0.08 }} className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-center shadow-[0_18px_45px_rgba(0,0,0,0.15)] transition ${accent.border}`}>
                <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition duration-500 ${accent.glow}`} />
                <div className="relative flex items-center justify-between text-[10px] font-mono text-white/35"><span>0{index + 1}</span><span className={`h-1.5 w-1.5 rounded-full shadow-[0_0_12px_currentColor] ${accent.dot}`} /></div>
                <motion.div initial={{ scale: 0.85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 + index * 0.08, type: "spring", stiffness: 180 }} className="relative mt-4 text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl">{item.value}</motion.div>
                <div className="relative mt-3 text-xs uppercase tracking-[0.2em] text-white/55">{item.label}</div>
                <div className={`relative mx-auto mt-5 h-1 w-16 overflow-hidden rounded-full ${accent.track}`}><motion.div initial={{ x: "-100%" }} whileInView={{ x: "0%" }} viewport={{ once: true }} transition={{ delay: 0.25 + index * 0.08, duration: 0.7 }} className={`h-full w-2/3 rounded-full ${accent.dot}`} /></div>
              </motion.div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <h3 className="text-[3.15rem] font-black leading-[0.82] tracking-[-0.075em] text-white sm:text-[5rem] lg:text-[7rem]">
              Have an idea?
              <span className="mt-1 block text-white/95">Let&apos;s build it.</span>
            </h3>
          </div>

          <div className="mt-10 grid gap-4">
            {[
              {
                label: "GitHub",
                value: "github.com/shahcaf",
                href: "https://github.com/shahcaf",
                action: "Open GitHub",
                accent: "cyan",
              },
              {
                label: "Phone",
                value: "+972 055-688-4247",
                href: "tel:+9720556884247",
                action: "Call now",
                accent: "sage",
              },
              {
                label: "Discord",
                value: "@r4ze083",
                href: "https://discord.com/users/447245727536775168",
                action: "Open Discord",
                accent: "violet",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -2, scale: 1.002 }}
                className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,23,0.89),rgba(12,18,28,0.82))] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_50px_rgba(0,0,0,0.18)] sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">{contact.label}</div>
                    <a href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noreferrer" : undefined} className="mt-3 block text-xl font-medium text-white sm:text-3xl">
                      {contact.value}
                    </a>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                    className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition ${
                      contact.accent === "cyan"
                        ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100 hover:border-cyan-300/40 hover:bg-cyan-300/15"
                        : contact.accent === "sage"
                          ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100 hover:border-emerald-300/35 hover:bg-emerald-300/15"
                          : "border-violet-300/20 bg-violet-300/10 text-violet-100 hover:border-violet-300/35 hover:bg-violet-300/15"
                    }`}
                  >
                    <ArrowUp className="h-4 w-4 -rotate-45" />
                    {contact.action}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/65">
                <span>{t.contact.formName}</span>
                <input
                  required
                  maxLength={80}
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => handleFormChange("name", event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/65">
                <span>{t.contact.formEmail}</span>
                <input
                  required
                  type="email"
                  maxLength={160}
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => handleFormChange("email", event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm text-white/65">
              <span>{t.contact.formType}</span>
              <select
                value={form.type}
                onChange={(event) => handleFormChange("type", event.target.value)}
                className="rounded-xl border border-white/10 bg-[#0b111a] px-4 py-3 text-white outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
              >
                {t.contact.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="mt-4 grid gap-2 text-sm text-white/65">
              <span>{t.contact.formMessage}</span>
              <textarea
                required
                minLength={12}
                maxLength={1250}
                rows={5}
                value={form.message}
                onChange={(event) => handleFormChange("message", event.target.value)}
                className="resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
              />
            </label>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className={`text-sm ${submitted ? "text-emerald-300" : submissionError ? "text-rose-300" : "text-white/40"}`}>
                {submitted ? t.contact.success : submissionError ? t.contact.error : "Replies go directly to Shahaf."}
              </div>
              <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070b13] transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:cursor-wait disabled:opacity-60">
                <Send className="h-4 w-4" />
                {submitting ? t.contact.sending : t.contact.submit}
              </button>
            </div>
          </form>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} onClick={(event) => event.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#0a101a] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><span className="text-xs uppercase tracking-[0.22em] text-cyan-300">{selectedProject.category === "client" ? t.projects.client : t.projects.personal}</span><button type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details" className="rounded-full border border-white/10 p-2 text-white/60 transition hover:border-white/30 hover:text-white"><X className="h-4 w-4" /></button></div>
              <div className="p-6 sm:p-8"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200"><Code2 className="h-6 w-6" /></div><h2 id="project-dialog-title" className="text-3xl font-black tracking-[-0.05em] text-white">{selectedProject.name}</h2><p className="mt-4 leading-7 text-white/65">{selectedProject.desc}</p><div className="mt-6 grid gap-3 border-y border-white/10 py-5 text-sm"><div><div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Role</div><div className="mt-1 text-white/80">{selectedProject.role || "Development"}</div></div><div><div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Stack</div><div className="mt-1 text-white/80">{selectedProject.stack || "Web · Product"}</div></div><div><div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Focus</div><div className="mt-1 text-white/80">{selectedProject.outcome || "A polished digital product."}</div></div></div><a href={selectedProject.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070b13] transition hover:-translate-y-1">{t.projects.view}<ExternalLink className="h-4 w-4" /></a></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative overflow-hidden border-t border-white/10 bg-[#05070b]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-white/55 sm:px-6 lg:grid-cols-[1.15fr_1.3fr_auto] lg:items-end lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-xs font-black text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.28)]">
                S
              </div>
              <div className="font-medium text-white">{t.footer.title}</div>
            </div>
            <div className="mt-3 max-w-xs leading-6 text-white/70">{t.footer.tag}</div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-[0.92rem] text-white/60 lg:justify-center">
            {[{ label: "GitHub", href: "https://github.com/shahcaf" }, { label: "Discord", href: "https://discord.com/users/447245727536775168" }, { label: "AeroGrowth", href: "https://discord.gg/T8e8u28cZp" }, { label: "Guns.lol", href: "https://guns.lol/aerogrowth" }, { label: "Memberlyx", href: "https://discord.gg/J5uc3p9vp" }, { label: "LeviBot", href: "https://discord.gg/6fv7vpUR7h" }].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-cyan-200">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-start gap-3 text-left lg:justify-end lg:text-right">
            <div className="text-white/50">{t.footer.rights}</div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-xs font-black text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.28)]">
              S
            </div>
          </div>
        </div>
      </footer>

      <div className={`fixed right-5 z-50 lg:bottom-7 lg:right-7 ${cookieNoticeOpen ? "bottom-24" : "bottom-5"}`}>
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="mb-4 w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070b13]/90 shadow-[0_30px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-white"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />{t.chat.online}</div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-white/40">Shahaf portfolio intelligence · {messages.length} {messages.length === 1 ? "message" : "messages"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={clearChat} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/55 transition hover:border-cyan-300/30 hover:text-cyan-100">
                    {t.chat.clear}
                  </button>
                  <button onClick={() => setChatOpen(false)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/75 transition hover:border-white/30 hover:text-white" aria-label="Close chat">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div ref={chatScrollRef} className="max-h-[420px] space-y-3 overflow-y-auto p-4">
                {messages.map((msg, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200"><Bot className="h-3.5 w-3.5" /></div>}
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${msg.role === "user" ? "rounded-br-md bg-cyan-400 text-[#03111b]" : "rounded-bl-md border border-white/10 bg-white/[0.07] text-white/85"}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-3 py-2 text-sm text-white/75"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:120ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:240ms]" /></span>{t.chat.typing}</div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 p-3">
                <div className="mb-3 grid grid-cols-3 gap-2">
                  <a href="#work" onClick={() => setChatOpen(false)} className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[10px] font-medium text-white/60 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100">{t.hero.explore}</a>
                  <a href="#contact" onClick={() => setChatOpen(false)} className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[10px] font-medium text-white/60 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100">{t.hero.contact}</a>
                  <a href="https://github.com/shahcaf" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[10px] font-medium text-white/60 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100">GitHub</a>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {t.chat.suggest.map((suggestion) => (
                    <button key={suggestion} onClick={() => { setInput(""); handleChatSubmit(suggestion); }} disabled={typing} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-white/70 transition hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-100 disabled:opacity-40">
                      {suggestion}
                    </button>
                  ))}
                </div>

                <form onSubmit={(event) => { event.preventDefault(); handleChatSubmit(); }} className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={typing}
                    className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:truncate placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/[0.08] disabled:opacity-50"
                    placeholder={t.chat.placeholder}
                  />
                  <button type="submit" disabled={typing || !input.trim()} className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-3 text-[#04131d] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setChatOpen((state) => !state)}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-[radial-gradient(circle,_rgba(34,211,238,0.2),rgba(14,116,144,0.12)_35%,rgba(3,7,18,0.96)_100%)] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.35)] transition hover:scale-[1.03]"
          aria-label={t.chat.label}
        >
          <MessageCircleMore className="h-7 w-7" />
        </button>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0a1018]/85 text-white/70 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-100 lg:bottom-7 lg:left-7"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cookieNoticeOpen && (
          <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} className="fixed bottom-24 left-4 right-4 z-[55] rounded-2xl border border-white/15 bg-[#0a1018]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:left-5 sm:right-auto sm:max-w-[420px] lg:bottom-7">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">🍪</div>
              <div>
                <h2 className="text-sm font-semibold text-white">{t.cookies.title}</h2>
                <p className="mt-1 text-xs leading-5 text-white/55">{t.cookies.text}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => closeCookieNotice("saved")} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#070b13] transition hover:-translate-y-0.5">{t.cookies.accept}</button>
                  <button type="button" onClick={() => closeCookieNotice("declined")} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/65 transition hover:border-white/25 hover:text-white">{t.cookies.decline}</button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
