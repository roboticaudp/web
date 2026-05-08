import { Typography, Badge } from "@/components/ui";
import { ParticipantStack } from "@/components/common";
import { ProjectHeader } from "./ProjectHeader";

interface ProjectItemProps {
  project: any;
  index: number;
  baseOffset: number;
  stackingOffset: number;
  headerRef?: React.RefObject<any>;
}

export const ProjectItem = ({
  project,
  index,
  baseOffset,
  stackingOffset,
  headerRef,
}: ProjectItemProps) => {
  return (
    <article
      className={`project-row min-h-screen ${
        index == 0 ? "lg:pt-15" : ""
      } flex flex-col overflow-hidden`}
      style={{ paddingTop: index === 0 ? `${baseOffset}px` : 0 }}
    >
      {index !== 0 && (
        <div
          className="w-full bg-transparent shrink-0"
          style={{ height: `${stackingOffset}px` }}
        />
      )}
      <div className="relative bg-background py-10 px-4 md:px-6 flex flex-col gap-8">
        <ProjectHeader
          ref={headerRef}
          title={project.title}
          index={index}
          status={project.status}
          statusLabel={project.statusLabel}
        />

        <main className="flex flex-col md:flex-row justify-between gap-8 md:gap-20">
          <Typography as="p" emphasis="medium" className="max-w-2xl">
            {project.description}
          </Typography>

          <footer className="max-w-md w-full flex flex-col justify-between gap-8">
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag: string) => (
                <Badge key={tag} size="xs" isMono color="inactive">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="pt-6 border-t border-white/5">
              <ParticipantStack count={project.participants} />
            </div>
          </footer>
        </main>
      </div>
    </article>
  );
};
