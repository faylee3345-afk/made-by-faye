import { useEffect, useRef } from "react";
import { revealLines } from "../../lib/motion";
import styles from "./SectionHeader.module.scss";

interface Props {
  number?: string;
  zh: string;
  en: string;
  note?: string;
}

export function SectionHeader({ number, zh, en, note }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    const cleanup = revealLines(ref.current);
    return cleanup;
  }, []);

  return (
    <header ref={ref} className={styles.header}>
      {number ? <span className={styles.number}>{number}</span> : <span />}
      <div className={styles.copy}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title} data-reveal>
            {zh}
          </h2>
        </div>
        <p className={styles.en}>{en}</p>
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
    </header>
  );
}
