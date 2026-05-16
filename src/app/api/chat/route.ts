import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant on Polad Balakişiyev portfolio website. Answer in Azerbaijani or English depending on user language. Polad is a Data Analytics & Frontend Developer student at Sumgayit State University. Skills: Power BI, SQL, Python, Excel, TypeScript, React, Next.js, Tailwind CSS, Git, Figma. Certifications: Microsoft PL-300, MO-211. Projects: Sales Analytics Dashboard, Customer Service Survey Dashboard. Contact: poladbalakishiyev20@gmail.com, GitHub: Polad009, LinkedIn: polad-balakishiyev, WhatsApp: +994 55 766 90 50. Only answer questions about Polad and his work.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || 'Cavab tapılmadı';
  return NextResponse.json({ reply });
}