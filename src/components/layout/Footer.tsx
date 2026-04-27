import { Logo } from "@/components/icons/Logo";

export const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted/60 font-mono">
          <a href="#" className="hover:text-primary transition-colors">admin.robotica.udp</a>
          <a href="#" className="hover:text-primary transition-colors">Docs</a>
          <a href="#" className="hover:text-primary transition-colors">Contacto</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 text-center md:text-left text-xs text-muted/40 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Robótica UDP. Universidad Diego Portales.</p>
        <p className="mt-2 md:mt-0">Diseñado con <span className="text-primary">♥</span> en Chile.</p>
      </div>
    </footer>
  );
};
