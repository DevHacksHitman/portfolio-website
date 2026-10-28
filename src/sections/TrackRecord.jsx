import { Suspense, lazy, useEffect, useRef, useState } from "react";

const PackScene = lazy(() => import("../components/PackScene.jsx"));

const TrackRecord = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  // mount the canvas only when the section is anywhere near the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setMounted(entries[0].isIntersecting),
      { rootMargin: "80% 0px 80% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // scroll progress across the tall section -> shared ref (no re-renders)
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = p;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="track"
      ref={sectionRef}
      className="relative my-20"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <h3 className="head-text absolute top-24 left-0 w-full text-center">
          Track Record
        </h3>
        <p className="absolute top-40 left-0 w-full text-center text-white-600">
          Every print is a shipped commit.
        </p>
        {mounted && (
          <Suspense fallback={null}>
            <PackScene progressRef={progressRef} />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default TrackRecord;
