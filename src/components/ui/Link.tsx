import * as React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends NextLinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "default" | "muted" | "primary" | "nav";
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "text-white hover:text-primary transition-colors",
      muted: "text-muted/60 hover:text-primary transition-colors",
      primary: "text-primary hover:text-primary/80 transition-colors",
      nav: "text-sm font-medium text-muted/60 hover:text-primary transition-colors",
    };

    return (
      <NextLink
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";

export { Link };
