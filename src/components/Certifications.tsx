"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function CertificationsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cert-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, delay: i * 0.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t.certifications.items]);

  return (
    <section ref={sectionRef} className="section-full flex-col justify-center px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] w-full mx-auto">
        <span className="cert-item text-[10px] tracking-[0.3em] text-white/25 uppercase block mb-16">
          {t.certifications.title}
        </span>

        <div className="space-y-0">
          {t.certifications.items.map((cert, i) => (
            <div
              key={i}
              className="cert-item group border-t border-white/[0.06] py-10 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-sm md:text-base font-mono text-white/15 tracking-wider">
                  {cert.name.match(/\((.*?)\)/)?.[1] || "CERT"}
                </span>
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-medium text-white/70 group-hover:text-white/90 transition-colors duration-500 tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cert.name.replace(/\((.*?)\)/, "").trim()}
                </h3>
              </div>
              <span className="text-xs tracking-[0.2em] text-white/20 uppercase md:text-right">
                {cert.issuer}
              </span>
            </div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}
