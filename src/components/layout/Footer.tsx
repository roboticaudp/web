import { Logo } from "@/components/icons/Logo";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";

export const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-16 pb-8 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <Logo />

        <nav className="hidden md:flex flex-col items-end gap-4">
          <Link href="#proyectos" variant="nav">Proyectos</Link>
          <Link href="#docs" variant="nav">Documentos</Link>
          <Link href="#comunidad" variant="nav">Comunidad</Link>
        </nav>
      </div>

      <div className="flex items-center justify-center text-center mt-16 text-xs text-muted/40">
        <Typography as="p" emphasis="medium" className="text-sm">Diseñado con ♥ desde Chile para el mundo.</Typography>
      </div>
    </footer>
  );
};
