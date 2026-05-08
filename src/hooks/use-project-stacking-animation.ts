import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseProjectStackingAnimationProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  headerHeight: number;
}

export function useProjectStackingAnimation({ sectionRef, headerHeight }: UseProjectStackingAnimationProps) {
  useGSAP(() => {
    if (headerHeight === 0 || !sectionRef.current) return;

    gsap.from(".project-row", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      immediateRender: false,
    });

    const cards = gsap.utils.toArray(".project-row");
    cards.forEach((card: any) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: sectionRef.current,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });
    });
  }, { dependencies: [headerHeight], scope: sectionRef });
}
