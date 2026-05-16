"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name animation: split by words
      const words = nameRef.current?.querySelectorAll(".word-reveal");
      if (words) {
        gsap.fromTo(
          words,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.5,
          }
        );
      }

      // Role animation
      gsap.fromTo(
        roleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
      );

      // Scroll hint
      gsap.fromTo(
        hintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.8 }
      );

      // Parallax on scroll
      gsap.to(nameRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-full flex-col justify-center px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <h1
          ref={nameRef}
          className="text-[clamp(2.5rem,8vw,9rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.hero.name.split(" ").map((word, i) => (
            <div key={i} className="overflow-hidden inline-block mr-[0.3em] last:mr-0">
              <span className="word-reveal inline-block">{word}</span>
            </div>
          ))}
        </h1>

        <div className="overflow-hidden mt-6 md:mt-8">
          <p
            ref={roleRef}
            className="text-sm sm:text-base md:text-lg tracking-[0.15em] text-white/70 uppercase font-light"
          >
            {t.hero.role}
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase">
          {t.hero.scrollHint}
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div className="w-full h-4 bg-white/40 absolute top-0 animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { top: -16px; }
          100% { top: 48px; }
        }
      `}</style>
    </section>
  );
}
