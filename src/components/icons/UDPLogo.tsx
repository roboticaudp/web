import { cn, getAssetPath } from "@/lib/utils";

export const UDPLogo = ({ className }: { className?: string }) => (
  <img
    src={getAssetPath("/images/udpfavicon.png")}
    alt="UDP Logo"
    className={cn("object-contain", className)}
  />
);
