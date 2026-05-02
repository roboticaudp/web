import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const pingVariants = cva(
  "inline-flex rounded-full h-2 w-2",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        inactive: "bg-white/20",
      }
    }
  }
);

export interface StatusPingProps {
  className?: string;
  variant: "primary" | "success" | "warning" | "error" | "inactive";
}

export const StatusPing = ({ variant, className }: StatusPingProps) => {
  const isInactive = variant === "inactive";

  return (
    <span className={cn("relative flex h-2 w-2", className)}>
      {!isInactive && (
        <span className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          pingVariants({ variant })
        )}></span>
      )}
      <span className={cn(
        "relative inline-flex rounded-full h-2 w-2",
        pingVariants({ variant })
      )}></span>
    </span>
  );
};
