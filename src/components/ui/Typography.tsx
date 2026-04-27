import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-foreground transition-colors", {
  variants: {
    variant: {
      h1: "text-6xl md:text-8xl font-bold tracking-tighter text-white",
      h2: "text-4xl md:text-5xl font-bold text-white tracking-tight",
      h3: "text-2xl font-semibold text-white",
      h4: "text-xl font-semibold text-white",
      h5: "text-lg font-semibold text-white",
      h6: "text-base font-semibold text-white",
      p: "text-lg text-muted/60 font-light leading-relaxed",
      small: "text-sm font-medium leading-none text-muted/40",
      mono: "font-mono text-sm uppercase tracking-widest",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = as || (variant && ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(variant) ? (variant as any) : "p");
    
    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
