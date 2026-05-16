"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Flatten all skill categories into one array for the staggered reveal
  const allSkills = t.skills.categories.flatMap(cat => cat.items);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        ".skills-label",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
        }
      );

      // Staggered text reveal
      gsap.utils.toArray<HTMLElement>(".skill-word").forEach((word, i) => {
        gsap.fromTo(
          word,
          { y: 50, opacity: 0, rotateX: 40 },
          {
            y: 0, opacity: 1, rotateX: 0, duration: 0.7,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [allSkills]);

  return (
    <section ref={sectionRef} className="section-full flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <span className="skills-label text-[10px] tracking-[0.3em] text-white/25 uppercase block mb-16">
          {t.skills.title}
        </span>

        <div ref={trackRef} className="flex flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-6">
          {allSkills.map((skill, i) => (
            <span
              key={i}
              className="skill-word text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/[0.12] hover:text-white/60 transition-colors duration-700 tracking-[-0.01em] cursor-default"
              style={{ fontFamily: "var(--font-display)", perspective: "400px" }}
              data-hover
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
