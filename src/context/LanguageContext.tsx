"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "@/locales/en";
import { az } from "@/locales/az";

type Language = "en" | "az";
type Dictionary = typeof en;

interface LanguageContextType {
  lang: Language;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("az");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "az" ? "en" : "az"));
  };

  const t = lang === "en" ? en : az;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
