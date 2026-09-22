import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mounted once, globally. Whenever the route/hash changes, scrolls the
 * matching in-page element into view — the same smooth-scroll behaviour
 * the browser already gives plain `<a href="#section">` links (via
 * `scroll-behavior: smooth` in index.css), just re-implemented so it also
 * works when the hash target lives on a different route (e.g. a "Book a
 * Call" button on a /services page linking to "/#contact").
 *
 * No visual change — this only restores/extends existing scroll behaviour.
 */
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Plain route change with no hash: jump to top, like a normal new page.
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    const id = hash.replace("#", "");
    // Give the new route a frame to render before looking for the element.
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);

  return null;
}
