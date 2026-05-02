import { Badge } from "@/components/ui/Badge";
import { UDPLogo } from "@/components/icons/UDPLogo";
import { cn } from "@/lib/utils";

export const UDPBadge = ({ className }: { className?: string }) => {
  return (
    <Badge
      color="inactive"
      size="xs"
      className={cn(
        "inline-flex items-center gap-1.5 h-6 align-middle hover:bg-white/10 transition-all duration-300",
        className
      )}
    >
      <UDPLogo className="w-5 h-5" />
      <span className="text-xs text-white/80">
        Universidad Diego Portales
      </span>
    </Badge>
  );
};
