import { cn } from "@/lib/utils";

export const UDPLogo = ({ className }: { className?: string }) => (
  <img
    src="/images/udpfavicon.png"
    alt="UDP Logo"
    className={cn("object-contain", className)}
  />
);
