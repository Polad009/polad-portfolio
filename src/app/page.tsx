"use client";

import { useState, useCallback, useEffect } from "react";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/Hero";
import AboutSection from "@/components/About";
import ProjectsSection from "@/components/Projects";
import CertificationsSection from "@/components/Certifications";
import SkillsSection from "@/components/Skills";
import ContactSection from "@/components/Contact";
import { useSoundEngine } from "@/hooks/useSoundEngine";
import { useLanguage } from "@/context/LanguageContext";
import Lenis from "lenis";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const { init, playClick, toggleMute } = useSoundEngine();
  const { lang, toggleLanguage } = useLanguage();

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Start sound on first click anywhere
  useEffect(() => {
    if (soundStarted) return;

    const handleFirstInteraction = async () => {
      if (!soundStarted) {
        await init();
        setSoundStarted(true);
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [soundStarted, init]);

  const handleMuteToggle = () => {
    const isMuted = toggleMute();
    setMuted(isMuted);
  };

  return (
    <>
      {!loaded && <Loader onComplete={handleLoadComplete} />}

      <CustomCursor />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Top Controls */}
      <div className="fixed top-8 right-8 z-[9999] flex items-center gap-8">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 flex items-center gap-2"
          data-hover
        >
          <span className={lang === "az" ? "text-white font-bold" : "text-white/20 hover:text-white/50"}>AZ</span>
          <span className="text-white/10">|</span>
          <span className={lang === "en" ? "text-white font-bold" : "text-white/20 hover:text-white/50"}>EN</span>
        </button>

        {/* Sound toggle */}
        {soundStarted && (
          <button
            onClick={handleMuteToggle}
            className="w-10 h-10 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors duration-300"
            aria-label="Toggle sound"
            data-hover
          >
            <span className="text-lg">{muted ? "🔇" : "🔊"}</span>
          </button>
        )}
      </div>

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}
