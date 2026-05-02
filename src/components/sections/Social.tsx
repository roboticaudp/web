"use client";

import { FaInstagram, FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typography } from "@/components/ui/Typography";
import { Link } from "@/components/ui/Link";
import { Avatar } from "@/components/ui/Avatar";
import { LinkedIn } from "@/components/icons/Linkedin";

const BOARD_MEMBERS = [
  { name: "Valentina Soto", role: "Presidenta", linkedin: "#", uv: { x: 0, y: 0 } },
  { name: "Ignacio Pérez", role: "Vicepresidente", linkedin: "#", uv: { x: -100, y: 0 } },
  { name: "Catalina Rivas", role: "Dir. Software", linkedin: "#", uv: { x: 0, y: -100 } },
  { name: "Catalina Rivas", role: "Dir. Software", linkedin: "#", uv: { x: 0, y: -100 } },
  { name: "Catalina Rivas", role: "Dir. Software", linkedin: "#", uv: { x: 0, y: -100 } },
  { name: "Diego Martínez", role: "Dir. Hardware", linkedin: "#", uv: { x: -100, y: -100 } }
];

export const Social = () => {
  return (
    <section id="comunidad" className="py-20 px-6 bg-background border-t border-white/5">
      <article className="max-w-7xl mx-auto">
        <SectionHeader
          title="Directiva"
          highlight="& Redes."
          subtitle="Conecta con el equipo y sigue nuestra actividad."
          className="mb-12"
        />

        <main className="space-y-8">
          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOARD_MEMBERS.map((member, i) => (
              <article
                key={i}
                className="p-4 border border-white/5 bg-white/[0.01] rounded-xl flex items-center gap-4 hover:bg-white/[0.03] transition-colors group"
              >
                <Avatar
                  seed={member.name}
                  imgClassName="grayscale group-hover:grayscale-0 transition-all"
                  className="w-12 h-12 transition-all shrink-0"
                />
                <header className="flex-1 min-w-0">
                  <Typography as="h4" className="text-sm font-bold truncate">{member.name}</Typography>
                  <Typography as="p" className="text-[10px] text-white/30 uppercase tracking-wider">{member.role}</Typography>
                </header>
                <Link href={member.linkedin} target="_blank" className="p-2 text-white/20 hover:text-[#0a66c2] transition-colors">
                  <LinkedIn className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </article>

          <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-8">
            <Link
              href="#"
              target="_blank"
              className="p-5 border border-white/5 bg-white/[0.01] rounded-xl flex items-center justify-between group hover:border-primary/30 transition-colors"
            >
              <nav className="flex items-center gap-4">
                <FaInstagram className="w-5 h-5 text-primary" />
                <header>
                  <Typography as="h4" className="text-sm font-bold">@robotica.udp</Typography>
                  <Typography as="p" className="text-xs text-white/30">Síguenos en Instagram</Typography>
                </header>
              </nav>
              <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="#"
              target="_blank"
              className="p-5 border border-white/5 bg-white/[0.01] rounded-xl flex items-center justify-between group hover:border-white/20 transition-colors"
            >
              <nav className="flex items-center gap-4">
                <FaGithub className="w-5 h-5 text-white" />
                <header>
                  <Typography as="h4" className="text-sm font-bold">Robótica UDP</Typography>
                  <Typography as="p" className="text-xs text-white/30">Repositorio Open Source</Typography>
                </header>
              </nav>
              <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white transition-colors" />
            </Link>
          </footer>
        </main>
      </article>
    </section>
  );
};
