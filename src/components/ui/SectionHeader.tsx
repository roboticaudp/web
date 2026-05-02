import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeader = ({ 
  title, 
  highlight, 
  subtitle, 
  className, 
  align = "left" 
}: SectionHeaderProps) => {
  return (
    <header className={cn(
      "mb-16",
      align === "center" && "text-center mx-auto",
      className
    )}>
      <Typography as="h2">
        {title} {highlight && <span className="text-primary">{highlight}</span>}
      </Typography>
      {subtitle && (
        <Typography 
          as="p" 
          className={cn(
            "mt-4",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </Typography>
      )}
    </header>
  );
};
