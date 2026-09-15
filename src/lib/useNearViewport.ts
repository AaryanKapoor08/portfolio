import { useEffect, useState, type RefObject } from 'react';

/**
 * True once `ref` has come within `rootMargin` of the viewport; never flips
 * back. Used to defer mounting WebGL stages (and their model downloads).
 */
export function useNearViewport(ref: RefObject<Element>, rootMargin: string) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return near;
}
