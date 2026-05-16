"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Number animation
      gsap.fromTo(
        ".about-number",
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 0.06, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
        }
      );

      // Text lines
      gsap.utils.toArray<HTMLElement>(".about-line").forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, delay: i * 0.15, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-full px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] w-full mx-auto grid md:grid-cols-12 gap-8 md:gap-16 items-start">
        {/* Big number */}
        <div className="md:col-span-3">
          <span
            className="about-number text-[clamp(6rem,15vw,14rem)] font-bold leading-none text-white/[0.06] tracking-[-0.05em] block"
            style={{ fontFamily: "var(--font-display)" }}
          >
            01
          </span>
        </div>

        {/* Content */}
        <div className="md:col-span-9 md:pt-8">
          <div className="mb-8">
            <span className="about-line text-[10px] tracking-[0.3em] text-white/50 uppercase block mb-6">
              Haqqımda / About
            </span>
          </div>

          <p className="about-line text-lg sm:text-xl md:text-2xl leading-relaxed text-white/80 font-light max-w-3xl mb-8">
            {t.about.text}
          </p>

          <div className="about-line mt-12 flex gap-12">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase block mb-2">University</span>
              <span className="text-sm text-white/70 font-light">{t.about.university}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase block mb-2">Field</span>
              <span className="text-sm text-white/70 font-light">{t.about.degree}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
