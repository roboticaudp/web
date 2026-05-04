"use client";

import { Instagram, GitHub, WhatsApp } from "@/components/icons";
import { Typography } from "@/components/ui/Typography";
import { SocialBanner } from "@/components/SocialBanner";

const SOCIAL_NETWORKS = [
  {
    href: "https://www.instagram.com/robotica.udp/",
    icon: Instagram,
    title: "Instagram",
    subtitle: "@robotica.udp",
    gradientClasses: "from-[#D32F2F]/40 via-[#C2185B]/20 to-[#7B1FA2]/40",
    glowColor: "bg-[#D32F2F]/20",
    className: "bg-[#080808]",
  },
  {
    href: "https://github.com/roboticaudp",
    icon: GitHub,
    title: "GitHub",
    subtitle: "@roboticaudp",
    gradientClasses: "from-white/5 to-transparent",
    glowColor: "bg-white/10",
    className: "bg-[#080808]",
  },
  {
    href: "https://chat.whatsapp.com/F3psnWghJzqGknAL1KHnrY",
    icon: WhatsApp,
    title: "WhatsApp",
    subtitle: "Comunidad Oficial",
    gradientClasses: "from-[#25D366]/20 via-[#128C7E]/10 to-transparent",
    glowColor: "bg-[#25D366]/10",
    className: "bg-[#0A0A0A]",
  },
];

export const Social = () => {
  return (
    <section id="comunidad" className="py-24 px-4 md:px-6 bg-background relative overflow-hidden">
      <header className="mb-16">
        <Typography as="h2">
          Nuestra <span className="text-primary">Presencia.</span>
        </Typography>
        <Typography as="p" emphasis="medium" className="max-w-2xl">
          Conecta con nosotros a través de nuestras plataformas oficiales para seguir proyectos, tutoriales y eventos.
        </Typography>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOCIAL_NETWORKS.map((network, index) => (
          <SocialBanner
            key={index}
            href={network.href}
            icon={network.icon}
            title={network.title}
            subtitle={network.subtitle}
            gradientClasses={network.gradientClasses}
            glowColor={network.glowColor}
            className={network.className}
          />
        ))}
      </main>
    </section>
  );
};
