import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
}

function setMeta(nameOrProp: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${nameOrProp}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(nameOrProp, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Sets per-page document metadata (title, description, Open Graph,
 * canonical) without pulling in a new dependency like react-helmet.
 * Restores the site-wide defaults on unmount so navigating away (e.g.
 * back to the homepage) doesn't leave a service page's title behind.
 */
export function SEOHead({ title, description, path }: SEOHeadProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    setCanonical(`${origin}${base}${path}`);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path]);

  return null;
}
