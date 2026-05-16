"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.8,
        ease: "power2.inOut",
        onUpdate: function () {
          const v = Math.round(this.targets()[0].val);
          setProgress(v);
          if (countRef.current) countRef.current.textContent = `${v}`;
          if (barRef.current) barRef.current.style.width = `${v}%`;
        },
      }
    );

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10001] bg-black flex flex-col items-center justify-center"
    >
      {/* Name */}
      <div className="mb-16">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.3em] text-white/90 uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          POLAD BALAKİŞİYEV
        </h1>
      </div>

      {/* Progress bar */}
      <div className="w-48 sm:w-64 md:w-80">
        <div className="h-[1px] bg-white/10 relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 bg-white transition-none"
            style={{ width: "0%" }}
          />
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">
            Loading
          </span>
          <span className="text-[10px] tracking-[0.2em] text-white/50 tabular-nums">
            <span ref={countRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
