"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge, Typography, StatusPing } from "@/components/ui";
import { ParticipantStack } from "@/components/common";
import { projects } from "content";

gsap.registerPlugin(ScrollTrigger);

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const baseOffset = isMobile ? 20 : isTablet ? 40 : 60;
  const gap = isMobile ? 12 : isTablet ? 24 : 40;

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
    <section id="proyectos" ref={sectionRef} className="bg-background relative z-10">
      {sortedProjects.map((project, index) => (
        <article
          key={index}
          className={`project-row min-h-screen ${index == 0 ? 'lg:pt-15' : ''} flex flex-col overflow-hidden`}
          style={{ paddingTop: index === 0 ? `${baseOffset}px` : 0 }}
        >
          {index !== 0 && (
            <div
              className="w-full bg-transparent shrink-0"
              style={{
                height: `${baseOffset + (index * (headerHeight + gap))}px`
              }}
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

              <Badge color={project.status} size="xs" isMono className="gap-2 py-1">
                <StatusPing variant={project.status} />
                {project.statusLabel}
              </Badge>
            </header>

            <main className="flex flex-col md:flex-row justify-between gap-8 md:gap-20">
              <Typography as="p" emphasis="medium" className="max-w-2xl">
                {project.description}
              </Typography>

              <footer className="max-w-md w-full flex flex-col justify-between gap-8">
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map(tag => (
                    <Badge key={tag} size="xs" isMono color="inactive">{tag}</Badge>
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
