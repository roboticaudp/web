"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TextRotatorProps {
  words: string[];
  className?: string;
  interval?: number;
  duration?: number;
}

export const TextRotator = ({
  words,
  className,
  interval = 3000,
  duration = 1
}: TextRotatorProps) => {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (words.length === 0) return;

    const totalWords = words.length;
    let currentIndex = 0;

    gsap.set(wordRefs.current, { yPercent: 100, opacity: 0, display: "none" });
    gsap.set(wordRefs.current[0], { yPercent: 0, opacity: 1, display: "inline-block" });

    const rotate = () => {
      const nextIndex = (currentIndex + 1) % totalWords;
      const currentWord = wordRefs.current[currentIndex];
      const nextWord = wordRefs.current[nextIndex];

      if (!currentWord || !nextWord) return;

      const tl = gsap.timeline();

      tl.to(currentWord, {
        yPercent: -100,
        opacity: 0,
        duration: duration,
        ease: "expo.inOut",
        onComplete: () => gsap.set(currentWord, { display: "none" })
      });

      tl.fromTo(nextWord,
        { yPercent: 100, opacity: 0, display: "inline-block" },
        { yPercent: 0, opacity: 1, duration: duration, ease: "expo.inOut" },
        "<"
      );

      currentIndex = nextIndex;
    };

    const timer = setInterval(rotate, interval);

    return () => clearInterval(timer);
  }, [words, interval, duration]);

  return (
    <span className={cn("relative inline-block h-[1.1em] align-top overflow-hidden", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => { wordRefs.current[i] = el; }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {word}
        </span>
      ))}
      <span className="invisible pointer-events-none opacity-0 select-none">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
    </span>
  );
};
