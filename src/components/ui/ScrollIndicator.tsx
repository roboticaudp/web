"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mouse } from "@/components/icons";
import { Typography } from "@/components/ui/Typography";

export const ScrollIndicator = () => {
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(iconRef.current, {
        y: 20,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, iconRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-10 animate-item">
      <div ref={iconRef}>
        <Mouse className="text-white/30" />
      </div>
      <Typography as="p" className="text-white/20 text-xs">
        Scroll
      </Typography>
    </div>
  );
};
