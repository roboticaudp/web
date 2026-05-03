import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {showText && (
        <span className="font-semibold tracking-tight text-white hidden sm:block">
          Robótica UDP
        </span>
      )}
    </div>
  );
};
