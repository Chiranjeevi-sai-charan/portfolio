import { useEffect } from "react";

const DEFAULT_TITLE = "Chiranjeevi Sai Charan, Product Designer";
const DEFAULT_DESCRIPTION =
  "Product designer with 5+ years of experience designing enterprise applications, AI-powered experiences, and scalable design systems.";

function setMeta(name, content, attr = "name") {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Sets document.title, meta description, canonical URL, and the
// matching Open Graph/Twitter tags per route — this is a plain SPA
// with no server-side rendering, so without this every route shares
// the same static tags from index.html, hurting both search results
// and social-share previews for deep pages like the case study.
export default function useDocumentHead({ title, description, path = "" } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Chiranjeevi Sai Charan` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `https://chirucreativeworks.vercel.app${path}`;

    document.title = fullTitle;
    setMeta("description", desc);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:url", url, "property");
    setMeta("twitter:title", desc);
    setMeta("twitter:description", desc);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Reset to the site-wide defaults on unmount so navigating away
    // (e.g. back to Home) doesn't leave a stale case-study title behind.
    return () => {
      document.title = DEFAULT_TITLE;
      setMeta("description", DEFAULT_DESCRIPTION);
      setMeta("og:title", DEFAULT_TITLE, "property");
      setMeta("og:description", DEFAULT_DESCRIPTION, "property");
      setMeta("og:url", "https://chirucreativeworks.vercel.app/", "property");
    };
  }, [title, description, path]);
}
