import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export function useEntranceAnimation(scope: React.RefObject<any>, selector: string = ".animate-item") {
  useLayoutEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3,
        clearProps: "all"
      });
    }, scope);

    return () => ctx.revert();
  }, [scope, selector]);
}
