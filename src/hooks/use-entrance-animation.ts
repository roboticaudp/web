import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function useEntranceAnimation(scope: React.RefObject<any>, selector: string = ".animate-item") {
  useGSAP(() => {
    if (!scope.current) return;

    gsap.from(selector, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.3,
      clearProps: "all"
    });
  }, { scope, dependencies: [selector] });
}
