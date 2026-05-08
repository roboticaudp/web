import { useState, useLayoutEffect, useRef } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  const timeoutRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        if (timeoutRef.current !== null) {
          window.cancelAnimationFrame(timeoutRef.current);
        }

        timeoutRef.current = window.requestAnimationFrame(() => {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        });
      }
    });

    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      if (timeoutRef.current !== null) {
        window.cancelAnimationFrame(timeoutRef.current);
      }
    };
  }, []);

  return [ref, dimensions] as const;
}
