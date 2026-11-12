import { useEffect, useRef, useState } from "react";

/**
 * Gentle fade-up when a section first enters the viewport.
 *
 * Uses an IntersectionObserver plus a scroll fallback: a fast scroll — or a
 * nav link that jumps several thousand pixels — can pass a section between two
 * observed frames, and an observer-only version would leave it invisible
 * forever. The fallback checks the element's position directly.
 *
 * Honours prefers-reduced-motion by rendering content immediately.
 */
const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    let frame = 0;

    const stop = () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };

    const check = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92;
      const alreadyPast = rect.bottom < window.innerHeight;
      if (inView || alreadyPast) {
        setVisible(true);
        stop();
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          stop();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return stop;
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
};

export default Reveal;