"use client";

import { ArrowUpRight, FileText, Code2, Database, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typography } from "@/components/ui/Typography";
import { Link } from "@/components/ui/Link";

const DOCUMENTS = [
  {
    id: "01",
    title: "Sistemas UAV",
    description: "Manuales de ensamblaje y protocolos de vuelo.",
    version: "v2.4",
    format: "PDF",
    icon: FileText,
  },
  {
    id: "02",
    title: "Control Lógico",
    description: "Firmware y algoritmos de estabilización.",
    version: "v1.1",
    format: "MD",
    icon: Code2,
  },
  {
    id: "03",
    title: "Esquemáticos",
    description: "Planos de PCB y diagramas de circuitos.",
    version: "v4.0",
    format: "CAD",
    icon: Cpu,
  },
  {
    id: "04",
    title: "Data Hub",
    description: "Base de datos y logs de misiones.",
    version: "v0.9",
    format: "SQL",
    icon: Database,
  }
];

export const Docs = () => {
  return (
    <section id="docs" className="h-screen px-4 md:px-6 bg-background relative">
      <header className="flex flex-row justify-between items-end">
        <div className="flex flex-col">
          <Typography as="h2">
            Documentación <span className="text-primary">Técnica.</span>
          </Typography>
          <Typography as="p" emphasis="medium">
            Base de conocimiento técnico.
          </Typography>
        </div>
        <Link href="#docs">
          Ver todos los documentos
        </Link>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DOCUMENTS.map((doc) => (
          <article
            key={doc.id}
            className="group p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
          >
            <header className="flex justify-between items-start mb-6">
              <figure className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-primary/10 transition-colors">
                <doc.icon className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
              </figure>
              <span className="text-[9px] font-mono text-white/20 tracking-tighter uppercase">{doc.version}</span>
            </header>

            <main>
              <Typography as="h4" className="text-base font-bold mb-1">{doc.title}</Typography>
              <Typography as="p" className="text-xs text-white/30 leading-relaxed">{doc.description}</Typography>
            </main>

            <footer className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/20">
              <span className="group-hover:text-white/40 transition-colors">FORMAT: {doc.format}</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </footer>
          </article>
        ))}
      </main>
    </section>
  );
};
