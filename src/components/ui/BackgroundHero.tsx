"use client";

export const BackgroundHero = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0A0A0A]">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[900px] max-h-[700px] bg-primary/10 blur-[140px] rounded-full opacity-60 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
    </div>
  );
};
