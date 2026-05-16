import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: "You are a helpful assistant on Polad Balakişiyev's portfolio website. Answer questions about Polad in Azerbaijani or English depending on user language. Polad is a Data Analytics & Frontend Developer student at Sumgayit State University. Skills: Power BI, SQL, Python, Excel, TypeScript, React, Next.js, Tailwind CSS, Git, Figma. Certifications: Microsoft PL-300, MO-211. Projects: Sales Analytics Dashboard, Customer Service Survey Dashboard. Contact: poladbalakishiyev20@gmail.com, GitHub: Polad009, LinkedIn: polad-balakishiyev, WhatsApp: +994 55 766 90 50. Only answer questions related to Polad and his work." }]
        },
        contents: [{ parts: [{ text: message }] }]
      })
    }
  );

  const data = await response.json();
  
  if (!response.ok) {
    return NextResponse.json({ error: 'Gemini API failed', details: data }, { status: 500 });
  }

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Cavab tapılmadı';
  return NextResponse.json({ reply });
}
