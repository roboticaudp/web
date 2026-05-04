"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Typography, Link, BackgroundHero } from "@/components/ui";
import { GearModel } from "@/components/models";

export default function NotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-404", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <GearModel />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="animate-404 mb-4">
          <Typography
            as="h1"
            className="select-none text-primary/20"
          >
            404
          </Typography>
        </div>

        <div className="animate-404 flex flex-col items-center">
          <Typography as="h2" className="mb-4">
            Sistema fuera de <span className="text-primary">órbita.</span>
          </Typography>
          <Typography as="p" emphasis="medium" className="max-w-md mb-12 mx-auto">
            La página que buscas ha sido removida o nunca existió. Verifica la URL o regresa al inicio.
          </Typography>
        </div>

        <div className="animate-404">
          <Link
            href="/"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 animate-404 opacity-20 hidden md:block">
        <Typography as="p" className="text-xs font-mono">
          ERROR_CODE: 0x00000194<br />
          STATUS: COMPONENT_NOT_FOUND<br />
          LOCATION: UNKNOWN_SECTOR
        </Typography>
      </div>
    </main>
  );
}
