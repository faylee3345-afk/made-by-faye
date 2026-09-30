import { Link } from "react-router-dom";
import type { MomentItem } from "../../types/content";
import { SectionHeader } from "../ui/SectionHeader";
import { TextLink } from "../ui/TextLink";
import styles from "./MomentsPreview.module.scss";

export function MomentsPreview({
  moments,
  titleZh,
  titleEn,
  note,
  moreZh,
  moreEn,
}: {
  moments: MomentItem[];
  titleZh: string;
  titleEn: string;
  note: string;
  moreZh: string;
  moreEn: string;
}) {
  if (!moments.length) return null;
  return (
    <section className={styles.section} id="moments-preview">
      <SectionHeader zh={titleZh} en={titleEn} note={note} />
      <div className={styles.sheet}>
        {moments.slice(0, 8).map((item) => (
          <Link key={item.slug} to="/moments" className={styles.item}>
            <img src={item.image} alt={item.caption || item.location || "片刻"} loading="lazy" />
            <p className={styles.caption}>
              {[item.location, item.date].filter(Boolean).join(" · ")}
            </p>
          </Link>
        ))}
      </div>
      <TextLink to="/moments" zh={moreZh} en={moreEn} />
    </section>
  );
}
