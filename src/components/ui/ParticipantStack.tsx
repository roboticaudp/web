import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";
import { Avatar } from "@/components/ui/Avatar";

interface ParticipantStackProps {
  count: number;
  className?: string;
}

export const ParticipantStack = ({ count, className }: ParticipantStackProps) => {
  const visibleAvatars = Math.min(count, 5);
  const remaining = count - visibleAvatars;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex -space-x-3">
        {[...Array(visibleAvatars)].map((_, i) => (
          <Avatar
            key={i}
            seed={`user-${i + 123}`}
            className="w-7 h-7"
          />
        ))}
        {remaining > 0 && (
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full border-2 border-zinc-800 bg-zinc-800 text-[10px] text-white/80 z-10">
            +{remaining}
          </div>
        )}
      </div>

      <Typography as="p" className="text-xs text-white/40">
        {count} Participantes
      </Typography>
    </div>
  );
};
