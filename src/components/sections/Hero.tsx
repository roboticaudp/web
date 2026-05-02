"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/Badge";
import { Typography } from "@/components/ui/Typography";
import { StatusPing } from "@/components/ui/StatusPing";
import { TextRotator } from "@/components/ui/TextRotator";
import { UDPLogo } from "@/components/icons/UDPLogo";
import { BackgroundHero } from "@/components/ui/BackgroundHero";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

import GearModel from "@/components/ui/GearModel";

const HERO_WORDS = ["cobra vida.", "se transforma.", "se acelera.", "evoluciona."];

export const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".animate-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <BackgroundHero />
      <GearModel className="z-10" />
      <div className="w-full px-24 relative z-20">
        <Badge className="animate-item mb-8" color="primary">
          <StatusPing variant="primary" className="mr-2" />
          Comunidad activa {new Date().getFullYear()}
        </Badge>

        <Typography as="h1" className="animate-item mb-10">
          Ingeniería que <br />
          <TextRotator
            words={HERO_WORDS}
            className="text-primary"
          />
        </Typography>

        <Typography as="p" emphasis="medium" className="animate-item">
          Hub tecnológico de la <Badge color="inactive" size="xs"> <UDPLogo className="w-5 h-5 mr-1" /> Universidad Diego Portales</Badge>. Desarrollamos el futuro de la robótica, un prototipo a la vez.
        </Typography>
      </div>

      <ScrollIndicator />
    </section>
  );
};
