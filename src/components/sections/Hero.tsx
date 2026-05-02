"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/Badge";
import { Typography } from "@/components/ui/Typography";
import { Link } from "@/components/ui/Link";
import { WhatsApp } from "@/components/icons/WhatsApp";
import { StatusPing } from "@/components/ui/StatusPing";
import { TextRotator } from "@/components/ui/TextRotator";
import { UDPBadge } from "@/components/ui/UDPBadge";
import { BackgroundHero } from "@/components/ui/BackgroundHero";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/F3psnWghJzqGknAL1KHnrY";
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

      <div className="w-full max-w-4xl px-4 text-center relative z-10">
        <Badge className="animate-item mb-8" variant="default">
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

        <Typography as="p" emphasis="medium" className="animate-item max-w-2xl mx-auto">
          Hub tecnológico de la <UDPBadge />. Desarrollamos el futuro de la robótica, un prototipo a la vez.
        </Typography>
      </div>

      <ScrollIndicator />
    </section>
  );
};
