import { useEffect, useRef } from "react";
import { revealMedia } from "../../lib/motion";
import styles from "./MediaFrame.module.scss";

interface Props {
  src: string;
  alt: string;
  ratio?: "landscape" | "portrait" | "wide" | "square" | "auto";
  className?: string;
  hoverable?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function MediaFrame({
  src,
  alt,
  ratio = "landscape",
  className,
  hoverable,
  priority,
  sizes = "(min-width: 900px) 70vw, 100vw",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    const cleanup = revealMedia(ref.current);
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      className={[
        styles.frame,
        styles[ratio],
        hoverable ? styles.hoverable : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-media-reveal
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
      />
    </div>
  );
}
