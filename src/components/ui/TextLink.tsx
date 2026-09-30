import { Link } from "react-router-dom";
import styles from "./TextLink.module.scss";

interface Props {
  to: string;
  zh: string;
  en: string;
}

export function TextLink({ to, zh, en }: Props) {
  return (
    <Link to={to} className={styles.link}>
      <span className={styles.zh}>{zh}</span>
      <span className={styles.en}>{en}</span>
      <span className={styles.arrow} aria-hidden>
        →
      </span>
    </Link>
  );
}
