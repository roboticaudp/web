import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { geist, clashGrotesk } from "@/app/fonts/fonts";

export const metadata: Metadata = {
  title: "Robótica UDP | Hub de Ingeniería",
  description: "Comunidad de robótica de la Universidad Diego Portales. Proyectos, documentación y tecnología.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${clashGrotesk.variable} font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-white`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
