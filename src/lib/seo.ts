import { useEffect } from "react";
import { getSettings } from "./content";

export function setDocumentSeo(title: string, description: string, image?: string) {
  document.title = title;
  const set = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let el = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      if (property) el.setAttribute("property", name);
      else el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };
  set("description", description);
  set("og:title", title, true);
  set("og:description", description, true);
  set("og:type", "website", true);
  if (image) set("og:image", image, true);
  set("twitter:card", "summary_large_image");
  set("twitter:title", title);
  set("twitter:description", description);
  if (image) set("twitter:image", image);
}

export function useSeo(title?: string, description?: string, image?: string) {
  const settings = getSettings();
  useEffect(() => {
    setDocumentSeo(
      title ?? settings.seoTitle,
      description ?? settings.seoDescription,
      image ?? settings.heroImage,
    );
  }, [title, description, image, settings.seoTitle, settings.seoDescription, settings.heroImage]);
}
