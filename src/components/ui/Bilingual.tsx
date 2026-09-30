import styles from "./Bilingual.module.scss";

interface Props {
  zh: string;
  en?: string;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
  inline?: boolean;
}

export function Bilingual({ zh, en, as: Tag = "div", className, inline }: Props) {
  return (
    <Tag className={[styles.pair, inline ? styles.inline : "", className].filter(Boolean).join(" ")}>
      <span className={styles.zh}>{zh}</span>
      {en ? <span className={styles.en}>{en}</span> : null}
    </Tag>
  );
}
