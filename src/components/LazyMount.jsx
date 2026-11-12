import { useEffect, useRef, useState } from "react";

/**
 * Defers mounting its children until the wrapper approaches the viewport, so
 * the globe's own copy of three.js is not part of first paint.
 *
 * Same two-part trigger as Reveal: an observer for the normal case, plus a
 * scroll/position check so a fast scroll or an anchor jump cannot skip past the
 * mount point and leave an empty box behind.
 */
const LazyMount = ({ children, className = "", placeholder = null, ...rest }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
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
      const nearView = rect.top < window.innerHeight * 1.1;
      const alreadyPast = rect.bottom < window.innerHeight;
      if (nearView || alreadyPast) {
        setShow(true);
        stop();
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          stop();
        }
      },
      { rootMargin: "240px 0px", threshold: 0 }
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return stop;
  }, []);

  return (
    <div ref={ref} className={className} {...rest}>
      {show ? children : placeholder}
    </div>
  );
};

export default LazyMount;