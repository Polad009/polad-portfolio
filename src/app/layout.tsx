import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "POLAD BALAKİŞİYEV — Data Analitika & Frontend Developer",
  description:
    "Portfolio of Polad Balakişiyev — Data Analytics & Frontend Developer. Power BI dashboards, React/Next.js applications, AI-powered solutions.",
  keywords: [
    "Polad Balakişiyev",
    "Data Analytics",
    "Frontend Developer",
    "Power BI",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Polad Balakişiyev" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
