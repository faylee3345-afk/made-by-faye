import { getAbout, getMilestones } from "../lib/content";
import { useSeo } from "../lib/seo";
import { MediaFrame } from "../components/ui/MediaFrame";
import { SectionHeader } from "../components/ui/SectionHeader";
import styles from "./AboutPage.module.scss";

export function AboutPage() {
  const about = getAbout();
  const milestones = getMilestones();
  useSeo("关于我｜FAYE", "About Faye Li");

  return (
    <div className={styles.page}>
      <SectionHeader zh="关于我" en="ABOUT FAYE" />
      <div className={styles.grid}>
        <div>
          <p className={styles.lead}>{about.statementZh}</p>
          {about.statementEn ? <p className={styles.en}>{about.statementEn}</p> : null}
          {about.stats.length ? (
            <div className={styles.stats}>
              {about.stats.map((stat) => (
                <p key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>
                    {stat.label}
                    {stat.labelEn ? ` / ${stat.labelEn}` : ""}
                  </span>
                </p>
              ))}
            </div>
          ) : null}
        </div>
        {about.photo ? (
          <div className={styles.photo}>
            <MediaFrame src={about.photo} alt="工作现场中的 Faye" ratio="portrait" priority />
          </div>
        ) : null}
      </div>
      <div className={styles.cols}>
        {about.expression ? (
          <section>
            <h3>表达 / VOICE</h3>
            <p>{about.expression}</p>
          </section>
        ) : null}
        {about.field ? (
          <section>
            <h3>现场 / FIELD</h3>
            <p>{about.field}</p>
          </section>
        ) : null}
        {about.making ? (
          <section>
            <h3>创作 / MAKING</h3>
            <p>{about.making}</p>
          </section>
        ) : null}
      </div>
      {milestones.length ? (
        <section className={styles.milestones}>
          <SectionHeader zh="一些节点" en="MILESTONES" />
          {milestones.map((item) => (
            <article key={item.slug} className={styles.row}>
              <p className={styles.year}>{item.year}</p>
              <div>
                <h3>{item.title}</h3>
                {item.titleEn ? <p className={styles.en}>{item.titleEn}</p> : null}
                {item.description ? <p>{item.description}</p> : null}
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
