"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-block").forEach((block) => {
        gsap.fromTo(
          block.querySelectorAll(".proj-anim"),
          { y: 70, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 65%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t.projects.items]); // Re-run when language changes

  return (
    <div ref={sectionRef}>
      {t.projects.items.map((project) => (
        <section
          key={project.number}
          className="project-block section-full flex-col justify-center px-6 md:px-16 lg:px-24"
        >
          <div className="max-w-[1400px] w-full mx-auto">
            {/* Number + Type */}
            <div className="proj-anim flex items-baseline gap-6 mb-6">
              <span
                className="text-[clamp(4rem,10vw,8rem)] font-bold text-white/[0.08] leading-none tracking-[-0.05em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                №{project.number}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
                  {project.type}
                </span>
                <span
                  className={`text-[10px] tracking-[0.2em] uppercase ${
                    project.status === "Live" || project.status === "Canlı"
                      ? "text-green-400"
                      : "text-white/40"
                  }`}
                >
                  ● {project.status}
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="overflow-hidden mb-8">
              <h2
                className="proj-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.05]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.name}
              </h2>
            </div>

            {/* Description */}
            <p className="proj-anim text-base md:text-lg text-white/75 font-light leading-relaxed max-w-2xl">
              {project.description}
            </p>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-anim inline-flex items-center gap-3 mt-10 text-sm tracking-[0.15em] text-white/80 hover:text-white uppercase transition-colors duration-500 group"
                data-hover
              >
                {t.projects.viewProject}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
