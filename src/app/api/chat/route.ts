import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are a professional assistant on Polad Balakişiyev's portfolio website. Answer questions about Polad in Azerbaijani and English depending on user's language. Here is information about Polad:
- Full name: Polad Balakişiyev
- Role: Data Analitika & Frontend Developer
- Student at Sumgayit State University, Computer Engineering
- Skills: Power BI, SQL, Python, Excel, TypeScript, React, Next.js, Tailwind CSS, Git, Figma
- Certifications: Microsoft PL-300 (Power BI Data Analyst Associate), MO-211 (Excel Associate)
- Projects: Sales Analytics Dashboard (Power BI), Customer Service Survey Dashboard (Power BI + Excel)
- Contact: poladbalakishiyev20@gmail.com, GitHub: Polad009, LinkedIn: polad-balakishiyev, WhatsApp: +994 55 766 90 50
- Available for internships and freelance projects
Only answer questions related to Polad and his work. For unrelated questions, politely redirect to portfolio topics.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: "model",
        parts: [{ text: "Anlaşıldı. Polad haqqında sualları cavablandırmağa hazıram. / Understood. I am ready to answer questions about Polad." }]
      },
      ...history,
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json({ error: "Gemini API failed" }, { status: 500 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
