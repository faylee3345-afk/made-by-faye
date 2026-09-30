import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.scss";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setFine(mq.matches && !reduced.matches);
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-cursor", fine);
    if (!fine) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const move = (event: MouseEvent) => {
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHover(Boolean(target?.closest("[data-cursor='view']")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-cursor");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div ref={ref} className={[styles.dot, hover ? styles.hover : ""].join(" ")} aria-hidden>
      <span className={styles.label}>
        查看
        <br />
        VIEW
      </span>
    </div>
  );
}
