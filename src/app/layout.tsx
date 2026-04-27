import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
    <html lang="es" className="dark">
      <body 
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-white`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
