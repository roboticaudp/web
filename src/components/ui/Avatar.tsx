import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps {
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
