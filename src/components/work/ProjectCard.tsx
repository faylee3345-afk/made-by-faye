import { Link } from "react-router-dom";
import type { Project } from "../../types/content";
import { MediaFrame } from "../ui/MediaFrame";
import styles from "./ProjectCard.module.scss";

interface Props {
  project: Project;
  index?: string;
  ratio?: "landscape" | "portrait" | "wide" | "square";
  layout?: "media" | "text";
  priority?: boolean;
}

export function ProjectCard({
  project,
  index,
  ratio = "landscape",
  layout = "media",
  priority,
}: Props) {
  const rolesZh = project.roles.map((role) => role.zh).join(" · ");
  const rolesEn = project.roles
    .map((role) => role.en)
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      to={`/work/${project.slug}`}
      className={[styles.card, layout === "text" ? styles.textOnly : ""].join(" ")}
      data-cursor="view"
      aria-label={`查看作品 ${project.title}`}
    >
      {layout === "media" ? (
        <MediaFrame src={project.cover} alt={project.title} ratio={ratio} hoverable priority={priority} />
      ) : (
        <MediaFrame src={project.cover} alt={project.title} ratio="square" hoverable />
      )}
      <div className={styles.meta}>
        <span className={styles.no}>{index ?? project.year}</span>
        <span>{project.year}</span>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      {project.titleEn ? <p className={styles.en}>{project.titleEn}</p> : null}
      {rolesZh ? (
        <p className={styles.roles}>
          {rolesZh}
          {rolesEn ? ` / ${rolesEn}` : ""}
        </p>
      ) : null}
    </Link>
  );
}
