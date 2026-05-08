import { useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";

export function useGSAPContext(scope?: React.RefObject<any>) {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
  
  useLayoutEffect(() => {
    return () => ctx.revert();
  }, [ctx]);

  return ctx;
}
