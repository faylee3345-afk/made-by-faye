import type { Project } from "../../types/content";
import { SectionHeader } from "../ui/SectionHeader";
import { TextLink } from "../ui/TextLink";
import { ProjectCard } from "../work/ProjectCard";
import styles from "./SelectedWorks.module.scss";

const SLOT = ["large", "portrait", "full", "offsetA", "offsetB", "text", "large", "portrait"] as const;

interface Props {
  projects: Project[];
  number: string;
  zh: string;
  en: string;
  moreZh: string;
  moreEn: string;
}

export function SelectedWorks({ projects, number, zh, en, moreZh, moreEn }: Props) {
  return (
    <section className={styles.section} id="selected">
      <SectionHeader number={number} zh={zh} en={en} />
      <div className={styles.grid}>
        {projects.map((project, i) => {
          const slot = SLOT[i] ?? "large";
          const ratio =
            slot === "portrait" || slot === "text"
              ? "portrait"
              : slot === "full"
                ? "wide"
                : "landscape";
          return (
            <div key={project.slug} className={styles[slot]}>
              <ProjectCard
                project={project}
                index={String(i + 1).padStart(2, "0")}
                ratio={ratio}
                layout={slot === "text" ? "text" : "media"}
                priority={i < 2}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.more}>
        <TextLink to="/work" zh={moreZh} en={moreEn} />
      </div>
    </section>
  );
}
