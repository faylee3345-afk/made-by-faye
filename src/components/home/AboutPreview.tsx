import type { AboutContent } from "../../types/content";
import { MediaFrame } from "../ui/MediaFrame";
import { SectionHeader } from "../ui/SectionHeader";
import { TextLink } from "../ui/TextLink";
import styles from "./AboutPreview.module.scss";

export function AboutPreview({
  about,
  titleZh,
  titleEn,
  moreZh,
  moreEn,
}: {
  about: AboutContent;
  titleZh: string;
  titleEn: string;
  moreZh: string;
  moreEn: string;
}) {
  return (
    <section className={styles.section} id="about-preview">
      <div className={styles.copy}>
        <SectionHeader zh={titleZh} en={titleEn} />
        <p className={styles.lead}>{about.statementZh}</p>
        <TextLink to="/about" zh={moreZh} en={moreEn} />
      </div>
      {about.photo ? (
        <div className={styles.photo}>
          <MediaFrame src={about.photo} alt="工作中的 Faye" ratio="portrait" />
        </div>
      ) : null}
    </section>
  );
}
