import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-lg leading-none shrink-0">
        R
      </div>
      {showText && (
        <span className="font-semibold tracking-tight text-white hidden sm:block">
          Robótica UDP
        </span>
      )}
    </div>
  );
};
