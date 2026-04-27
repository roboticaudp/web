import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";

interface AvatarProps {
  src?: string;
  seed?: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
}

export const Avatar = ({ src, seed, className, imgClassName, style }: AvatarProps) => {
  return (
    <div 
      className={cn("relative rounded-full border-2 border-zinc-800 bg-surface overflow-hidden flex items-center justify-center", className)}
    >
      <img
        src={src || `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${seed || "default"}`}
        alt="Avatar"
        className={cn("w-full h-full object-cover", src && "max-w-none", imgClassName)}
        style={style}
      />
    </div>
  );
};

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

      <Typography variant="p" className="text-xs text-white/40">
        {count} Participantes
      </Typography>
    </div>
  );
};
