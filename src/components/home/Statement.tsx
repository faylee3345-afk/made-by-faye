import styles from "./Statement.module.scss";

export function Statement({ zh, en }: { zh: string; en: string }) {
  return (
    <section className={styles.block} aria-label="网站陈述">
      <div className={styles.sticky}>
        <p className={styles.zh}>{zh}</p>
        <p className={styles.en}>{en}</p>
      </div>
    </section>
  );
}
