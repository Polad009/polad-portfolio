"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const links = [
    { label: t.contact.email, value: "poladbalakishiyev20@gmail.com", href: "mailto:poladbalakishiyev20@gmail.com" },
    { label: t.contact.github, value: "github.com/Polad009", href: "https://github.com/Polad009" },
    { label: t.contact.linkedin, value: "linkedin.com/in/polad-balakishiyev", href: "https://www.linkedin.com/in/polad-balakishiyev" },
    { label: t.contact.whatsapp, value: "+994 55 766 90 50", href: "https://wa.me/994557669050" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".contact-link").forEach((link, i) => {
        gsap.fromTo(
          link,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: 0.3 + i * 0.12, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t.contact]);

  return (
    <section ref={sectionRef} className="section-full flex-col justify-center px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="overflow-hidden mb-20">
          <h2
            className="contact-heading text-[clamp(2.5rem,7vw,8rem)] font-bold text-white leading-[0.95] tracking-[-0.03em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.contact.title.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          <p className="contact-link text-white/70 font-light mt-8 text-lg">
            {t.contact.description}
          </p>
        </div>

        <div className="space-y-0">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.label === t.contact.email ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="contact-link group border-t border-white/[0.1] py-6 md:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors duration-500 hover:border-white/30"
              data-hover
            >
              <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase group-hover:text-white/80 transition-colors duration-500">
                {link.label}
              </span>
              <span className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors duration-500 font-light flex items-center gap-3">
                {link.value}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          ))}
          <div className="border-t border-white/[0.1]" />
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">
            {t.footer.copyright}
          </span>
        </div>
      </div>
    </section>
  );
}
