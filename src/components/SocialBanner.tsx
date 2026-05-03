"use client";

import { ArrowUpRight } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { Link } from "@/components/ui/Link";
import { cn } from "@/lib/utils";
import React from "react";

interface SocialBannerProps {
  href: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  gradientClasses: string; // Ejemplo: "from-[#D32F2F]/40 via-[#C2185B]/20 to-[#7B1FA2]/40"
  glowColor: string;       // Ejemplo: "bg-[#D32F2F]/20"
  className?: string;
  children?: React.ReactNode; // Para contenido extra como el grid de GitHub
}

export const SocialBanner = ({
  href,
  icon: Icon,
  title,
  subtitle,
  gradientClasses,
  glowColor,
  className,
  children
}: SocialBannerProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "group relative h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-8 md:p-14 transition-all duration-700",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-tr opacity-40 group-hover:opacity-70 transition-opacity duration-700",
        gradientClasses
      )} />

      <div className={cn(
        "absolute -top-24 -right-24 w-[500px] h-[500px] blur-[120px] rounded-full group-hover:scale-125 transition-transform duration-1000",
        glowColor
      )} />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="p-5 rounded-2xl border border-white/20 flex items-center justify-center">
            <Icon className="w-12 h-12 text-white" />
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
            <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
          </div>
        </div>

        <div className="space-y-2 mb-10">
          <Typography as="h3" className="text-5xl md:text-7xl font-bold">
            {title}
          </Typography>
          <Typography as="p" emphasis="medium" className="font-mono text-sm">
            {subtitle}
          </Typography>
        </div>
      </div>
    </Link>
  );
};
