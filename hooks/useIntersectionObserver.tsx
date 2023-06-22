import { useEffect } from "react";

export default function useIntersectionObserver(
  ref: { current: Element },
  callback: IntersectionObserverCallback,
) {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: document.querySelector(".app"),
      threshold: [0.2, 0.5],
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
}
