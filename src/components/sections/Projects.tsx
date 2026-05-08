"use client";

import { projects } from "content";
import { useProjectStackingAnimation } from "@/hooks/use-project-stacking-animation";
import { ProjectItem } from "./projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMeasure } from "@/hooks/use-measure";
import { useRef } from "react";

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [measureRef, { height: headerHeight }] = useMeasure<HTMLDivElement>();
  
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const initialStackingOffset = isMobile ? 20 : isTablet ? 40 : 60;
  const stackingVerticalGap = isMobile ? 12 : isTablet ? 24 : 40;

  useProjectStackingAnimation({
    sectionRef,
    headerHeight,
  });

  const getStackingOffset = (index: number) => {
    if (index === 0) return 0;
    return initialStackingOffset + (index * (headerHeight + stackingVerticalGap));
  };

  return (
    <section id="proyectos" ref={sectionRef} className="bg-background relative z-10">
      {sortedProjects.map((project, index) => (
        <ProjectItem
          key={index}
          project={project}
          index={index}
          baseOffset={initialStackingOffset}
          stackingOffset={getStackingOffset(index)}
          headerRef={index === 0 ? measureRef : undefined}
        />
      ))}
    </section>
  );
};
