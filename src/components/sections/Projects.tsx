"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { Typography } from "@/components/ui/Typography";
import { StatusPing } from "@/components/ui/StatusPing";
import { ParticipantStack } from "@/components/ui/ParticipantStack";
import { projects } from "content";

gsap.registerPlugin(ScrollTrigger);

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (measureRef.current) {
      const height = measureRef.current.offsetHeight;
      setHeaderHeight(height);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, []);

  useEffect(() => {
    if (headerHeight === 0) return;

    const ctx = gsap.context(() => {
      // Rows reveal
      gsap.from(".project-row", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        immediateRender: false,
      });

      // Stacking effect
      const cards = gsap.utils.toArray(".project-row");
      cards.forEach((card: any) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: sectionRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [headerHeight]);

  return (
    <section id="proyectos" ref={sectionRef} className="bg-background relative z-10 border-t border-white/5">
      {sortedProjects.map((project, index) => (
        <article
          key={index}
          className={`project-row border-b border-white/5 min-h-screen ${index === 0 ? "pt-15" : ""} flex flex-col overflow-hidden`}
        >
          {index !== 0 && (
            <div
              className="w-full bg-transparent shrink-0"
              style={{ height: `${60 + (index * (headerHeight + 40))}px` }}
            />
          )}
          <div
            className="relative bg-background py-10 px-4 md:px-6 flex flex-col gap-8"
          >
            <header
              ref={index === 0 ? measureRef : null}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="text-primary font-mono text-xs md:text-sm shrink-0">02.0{index + 1} /</span>
                <Typography
                  as="h2"
                >
                  {project.title}
                </Typography>
              </div>

              <span className="flex items-center gap-2 border border-white/10 px-3 py-1 rounded-full bg-white/5">
                <StatusPing variant={project.status as any} />
                <span className="text-[10px] font-mono text-white/60">{project.statusLabel}</span>
              </span>
            </header>

            <main className="flex flex-col md:flex-row justify-between gap-8 md:gap-20">
              <Typography as="p" className="text-sm max-w-2xl md:text-base text-white/40 leading-relaxed">
                {project.description}
              </Typography>

              <footer className="max-w-md w-full flex flex-col justify-between gap-8">
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="mono" className="text-[10px] bg-white/5 border-white/10">{tag}</Badge>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5">
                  <ParticipantStack count={project.participants} />
                </div>
              </footer>
            </main>
          </div>
        </article>
      ))}
    </section>
  );
};
