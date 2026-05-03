"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typography } from "@/components/ui/Typography";

gsap.registerPlugin(ScrollTrigger);

export const Message = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const text = "Si lo puedes imaginar, lo puedes programar.";
  const words = text.split(" ");

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: containerRef.current,
          scrub: 1,
        },
      });

      // Animación del mensaje
      tl.fromTo(
        ".word",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 0.87,
          y: 0,
          stagger: 0.5,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Animación de la firma
      tl.fromTo(
        ".signature",
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 0.6,
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
        "+=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] flex items-start justify-center bg-background overflow-hidden pt-[20vh]"
    >
      <div
        ref={containerRef}
        className="text-center w-full px-6 pt-[15vh]"
      >
        <Typography
          as="h2"
          className="text-4xl md:text-9xl flex flex-wrap"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </Typography>
        <Typography
          as="p"
          emphasis="medium"
          className="signature font-light italic text-end mt-28"
        >
          - Programación ATS
        </Typography>
      </div>
    </section>
  );
};
