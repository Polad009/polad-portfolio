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
        <span className="skills-label text-[10px] tracking-[0.3em] text-white/60 uppercase block mb-16">
          {t.skills.title}
        </span>

        <div ref={trackRef} className="flex flex-wrap gap-4 md:gap-6">
          {allSkills.map((skill, i) => (
            <span
              key={i}
              className="skill-word px-6 py-3 border border-white/20 rounded-full text-base md:text-lg lg:text-xl font-medium text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-default shadow-[0_0_15px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
