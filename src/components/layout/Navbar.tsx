import { Logo } from "@/components/icons/Logo";
import { Link } from "@/components/ui/Link";

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#proyectos" variant="nav">Proyectos</Link>
          <Link href="#docs" variant="nav">Documentos</Link>
          <Link href="#comunidad" variant="nav">Comunidad</Link>
        </nav>
      </div>
    </header>
  );
};
