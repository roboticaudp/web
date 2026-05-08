"use client";

import { projects } from "content";
import { useProjectStacking } from "@/hooks/use-project-stacking";
import { ProjectItem } from "./projects";

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const Projects = () => {
  const { 
    sectionRef, 
    measureRef, 
    baseOffset, 
    getStackingOffset 
  } = useProjectStacking();

  return (
    <section id="proyectos" ref={sectionRef} className="bg-background relative z-10">
      {sortedProjects.map((project, index) => (
        <ProjectItem
          key={index}
          project={project}
          index={index}
          baseOffset={baseOffset}
          stackingOffset={getStackingOffset(index)}
          headerRef={index === 0 ? measureRef : undefined}
        />
      ))}
    </section>
  );
};
