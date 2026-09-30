import { getMoments } from "../lib/content";
import { useSeo } from "../lib/seo";
import { SectionHeader } from "../components/ui/SectionHeader";
import styles from "./MomentsPage.module.scss";

export function MomentsPage() {
  const moments = getMoments();
  useSeo("片刻｜FAYE", "Moments — Faye Li");

  return (
    <div className={styles.page}>
      <SectionHeader zh="片刻" en="MOMENTS" note="作品之外的一些瞬间。" />
      <div className={styles.sheet}>
        {moments.map((item) => (
          <figure key={item.slug} className={styles.item}>
            <img src={item.image} alt={item.caption || item.location || "片刻"} loading="lazy" />
            <figcaption className={styles.meta}>
              {[item.location, item.date].filter(Boolean).join(" · ")}
              {item.caption ? <p className={styles.caption}>{item.caption}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
