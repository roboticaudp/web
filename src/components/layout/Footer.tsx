import { Logo } from "@/components/icons/Logo";
import { Typography } from "@/components/ui/Typography";

export const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-16 pb-8 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted/60 font-mono">
          <a href="#" className="hover:text-primary transition-colors">admin.robotica.udp</a>
          <a href="#" className="hover:text-primary transition-colors">Docs</a>
          <a href="#" className="hover:text-primary transition-colors">Contacto</a>
        </div>
      </div>

      <div className="flex items-center justify-center text-center mt-16 text-xs text-muted/40">
        <Typography as="p" emphasis="medium" className="text-sm">Diseñado con ♥ desde Chile para el mundo.</Typography>
      </div>
    </footer>
  );
};
