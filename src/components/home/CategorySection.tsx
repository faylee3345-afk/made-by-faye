import { Link } from "react-router-dom";
import type { CategoryMeta, Project } from "../../types/content";
import { MediaFrame } from "../ui/MediaFrame";
import { SectionHeader } from "../ui/SectionHeader";
import { TextLink } from "../ui/TextLink";
import { ProjectCard } from "../work/ProjectCard";
import styles from "./CategorySection.module.scss";

interface Props {
  meta: CategoryMeta;
  projects: Project[];
}

export function CategorySection({ meta, projects }: Props) {
  if (!projects.length) return null;
  const [first, ...rest] = projects;
  const extra = rest.slice(0, 3);

  if (meta.id === "editorial") {
    return (
      <section className={styles.section} id={meta.id}>
        <div className={styles.inner}>
          <SectionHeader number={meta.number} zh={meta.zh} en={meta.en} note={meta.noteZh} />
          <div className={styles.catalog}>
            {projects.map((project) => (
              <Link key={project.slug} to={`/work/${project.slug}`} className={styles.row} data-cursor="view">
                <strong>{project.title}</strong>
                <img src={project.cover} alt="" />
                <span className={styles.year}>{project.year}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.more}>
          <TextLink to={`/work?category=${meta.id}`} zh={meta.moreZh} en={meta.moreEn} />
        </div>
      </section>
    );
  }

  return (
    <section
      className={[styles.section, (styles as Record<string, string>)[meta.id] ?? ""].join(" ")}
      id={meta.id}
    >
      {meta.id === "sports" ? (
        <div className={styles.marks} aria-hidden>
          <span>00:47:32</span>
          <span>LANE 04</span>
          <span>LIVE</span>
          <span>START — FINISH</span>
        </div>
      ) : null}
      <div className={styles.inner}>
        <SectionHeader number={meta.number} zh={meta.zh} en={meta.en} note={meta.noteZh} />
        {meta.id === "stage" ? (
          <div className={styles.lead}>
            <ProjectCard project={first} ratio="wide" />
          </div>
        ) : (
          <div className={styles.grid}>
            <div className={styles.lead}>
              <ProjectCard
                project={first}
                ratio={meta.id === "stories" || meta.id === "on-camera" ? "wide" : "landscape"}
              />
            </div>
            {extra.length ? (
              <div className={styles.side}>
                {extra.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    ratio={meta.id === "creative" ? "portrait" : "landscape"}
                  />
                ))}
              </div>
            ) : (
              <MediaFrame src={first.hero || first.cover} alt={first.title} ratio="portrait" />
            )}
          </div>
        )}
      </div>
      <div className={styles.more}>
        <TextLink to={`/work?category=${meta.id}`} zh={meta.moreZh} en={meta.moreEn} />
      </div>
    </section>
  );
}
