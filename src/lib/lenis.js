import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

let activeLenis = null;

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    activeLenis = lenis;

    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);
}

export function scrollToSection(id, offset = -84) {
  const el = document.getElementById(id);
  if (!el) return;

  if (activeLenis) {
    activeLenis.scrollTo(el, { offset });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
