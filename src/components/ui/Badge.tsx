import * as React from "react"
import { cn } from "@/lib/utils"

const BADGE_VARIANTS = {
  glass: "backdrop-blur-md border",
  outline: "bg-transparent border",
  solid: "border-transparent",
} as const

const BADGE_COLORS = {
  primary: "text-primary border-primary/20 bg-primary/10",
  success: "text-green-500 border-green-500/20 bg-green-500/10",
  warning: "text-yellow-500 border-yellow-500/20 bg-yellow-500/10",
  error: "text-red-500 border-red-500/20 bg-red-500/10",
  inactive: "text-white/40 border-white/10 bg-white/5",
} as const

const BADGE_SIZES = {
  xs: "px-2 py-0.5 text-[10px]",
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
} as const

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  variant?: keyof typeof BADGE_VARIANTS
  color?: keyof typeof BADGE_COLORS
  size?: keyof typeof BADGE_SIZES
  isMono?: boolean
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, as: Tag = "span", variant = "glass", color = "inactive", size = "sm", isMono = false, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold w-fit",
          BADGE_VARIANTS[variant],
          BADGE_COLORS[color],
          BADGE_SIZES[size],
          isMono && "font-mono uppercase tracking-widest",
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
