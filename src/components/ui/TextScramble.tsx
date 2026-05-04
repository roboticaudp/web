"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  scrambleDelay?: number;
  scrambleDuration?: number;
  chars?: string;
  repeatDelay?: number;
  className?: string;
}

const DEFAULT_CHARS = "          ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz<>{}[]()!@#$%^&*_+-=:/?.";

export const TextScramble = ({
  text,
  scrambleDelay = 0,
  scrambleDuration = 1,
  chars = DEFAULT_CHARS,
  repeatDelay = 6,
  className,
}: TextScrambleProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;
    const originalText = text;
    
    const updateText = (progress: number) => {
      let scrambled = "";
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === " ") {
          scrambled += " ";
          continue;
        }

        // Logic: gradually reveal the original text as progress increases
        // But also always keep some "glitch" feel until the very end
        const isRevealed = Math.random() < progress;
        if (isRevealed && progress > 0.8) {
          scrambled += originalText[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.innerText = scrambled;
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: repeatDelay,
        delay: scrambleDelay,
      });

      const proxy = { progress: 0 };

      tl.to(proxy, {
        progress: 1,
        duration: scrambleDuration,
        ease: "none",
        onUpdate: () => {
          updateText(proxy.progress);
        },
        onComplete: () => {
          el.innerText = originalText;
        },
      })
      // Quick pause on original text before repeating
      .to({}, { duration: 0.1 });
    });

    return () => ctx.revert();
  }, [text, scrambleDelay, scrambleDuration, chars, repeatDelay]);

  return (
    <span 
      ref={textRef} 
      className={cn("scramble-text inline-block", className)}
    >
      {text}
    </span>
  );
};
