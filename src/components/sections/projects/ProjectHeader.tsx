import { Badge, Typography, StatusPing } from "@/components/ui";
import { forwardRef } from "react";

interface ProjectHeaderProps {
  title: string;
  index: number;
  status: any;
  statusLabel: string;
}

export const ProjectHeader = forwardRef<HTMLElement, ProjectHeaderProps>(
  ({ title, index, status, statusLabel }, ref) => {
    return (
      <header
        ref={ref}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="text-primary font-mono text-xs md:text-sm shrink-0">
            02.0{index + 1} /
          </span>
          <Typography as="h2">{title}</Typography>
        </div>

        <Badge color={status} size="xs" isMono className="gap-2 py-1">
          <StatusPing variant={status} />
          {statusLabel}
        </Badge>
      </header>
    );
  }
);

ProjectHeader.displayName = "ProjectHeader";
