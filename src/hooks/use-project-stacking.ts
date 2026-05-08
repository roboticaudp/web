import { useMediaQuery } from "@/hooks/use-media-query";
import { useMeasure } from "@/hooks/use-measure";
import { useGSAPContext } from "@/hooks/use-gsap-context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useProjectStacking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [measureRef, { height: headerHeight }] = useMeasure<HTMLDivElement>();
  
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const baseOffset = isMobile ? 20 : isTablet ? 40 : 60;
  const gap = isMobile ? 12 : isTablet ? 24 : 40;

  useGSAPContext(sectionRef);

  useEffect(() => {
    if (headerHeight === 0) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, [headerHeight]);

  const getStackingOffset = (index: number) => {
    if (index === 0) return 0;
    return baseOffset + (index * (headerHeight + gap));
  };

  return {
    sectionRef,
    measureRef,
    headerHeight,
    baseOffset,
    getStackingOffset,
  };
}
