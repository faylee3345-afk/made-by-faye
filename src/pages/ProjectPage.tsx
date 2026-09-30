import { Link, Navigate, useParams } from "react-router-dom";
import { getCategory } from "../lib/categories";
import { getNextProject, getProject, getRelatedProjects } from "../lib/content";
import { useSeo } from "../lib/seo";
import { embedSrc } from "../lib/video";
import { TextLink } from "../components/ui/TextLink";
import { ProjectCard } from "../components/work/ProjectCard";
import { SectionHeader } from "../components/ui/SectionHeader";
import styles from "./ProjectPage.module.scss";

export function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  useSeo(
    project ? `${project.title}｜FAYE` : "作品｜FAYE",
    project?.seoDescription || project?.summary,
    project?.cover,
  );

  if (!project) return <Navigate to="/work" replace />;

  const category = getCategory(project.primaryCategory);
  const next = getNextProject(project.slug);
  const related = getRelatedProjects(project);
  const hero = project.hero || project.cover;
  const paragraphs = project.body.split(/\n\n+/).filter(Boolean);

  const galleryBlocks = groupGallery(project.gallery);

  return (
    <article className={styles.page}>
      <header className={styles.meta}>
        <p className={styles.no}>PROJECT NO. {String(project.featuredOrder || 1).padStart(2, "0")}</p>
        <h1 className={styles.title}>{project.title}</h1>
        {project.titleEn ? <p className={styles.en}>{project.titleEn}</p> : null}
        <div className={styles.facts}>
          <span>年份 / YEAR {project.year}</span>
          <span>类别 / CATEGORY {category?.zh}</span>
          {project.roles.length ? (
            <span>角色 / ROLE {project.roles.map((role) => role.zh).join(" · ")}</span>
          ) : null}
        </div>
      </header>
      <div className={styles.hero}>
        <img src={hero} alt={project.title} />
      </div>
      {paragraphs.length ? (
        <section className={styles.block}>
          <SectionHeader zh="关于作品" en="ABOUT" />
          <div className={styles.body}>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>
      ) : null}
      {project.roles.length ? (
        <section className={styles.block}>
          <SectionHeader zh="我的角色" en="MY ROLE" />
          <ul className={styles.roles}>
            {project.roles.map((role) => (
              <li key={role.zh}>
                {role.zh}
                {role.en ? <span className={styles.en}>{role.en}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {project.video ? (
        <section className={styles.block + " " + styles.wide}>
          <div className={styles.wideInner}>
            <SectionHeader zh="观看作品" en="WATCH" />
          </div>
          <div className={styles.embed}>
            {project.video.provider === "file" ? (
              <video controls poster={project.cover} src={project.video.url} />
            ) : (
              <iframe
                src={embedSrc(project.video.provider, project.video.url)}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </section>
      ) : null}
      {galleryBlocks.length ? (
        <section className={[styles.block, styles.wide].join(" ")}>
          <div className={styles.wideInner}>
            <SectionHeader zh="现场片段" en="GALLERY" />
          </div>
          <div className={styles.gallery}>
            {galleryBlocks.map((block, i) =>
              block.type === "pair" ? (
                <div className={styles.pair} key={`pair-${i}`}>
                  {block.items.map((item) => (
                    <figure key={item.image}>
                      <img src={item.image} alt={item.caption || project.title} />
                      {item.caption ? <figcaption className={styles.caption}>{item.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              ) : (
                <figure
                  key={block.item.image}
                  className={block.item.layout === "portrait" ? styles.portrait : styles.full}
                >
                  <img src={block.item.image} alt={block.item.caption || project.title} />
                  {block.item.caption ? (
                    <figcaption className={styles.caption}>{block.item.caption}</figcaption>
                  ) : null}
                </figure>
              ),
            )}
          </div>
        </section>
      ) : null}
      {project.behind ? (
        <section className={styles.block}>
          <SectionHeader zh="创作手记" en="BEHIND THE WORK" />
          <p className={styles.behind}>{project.behind}</p>
        </section>
      ) : null}
      {related.length ? (
        <section className={styles.block + " " + styles.wide}>
          <div className={styles.wideInner}>
            <SectionHeader zh="相关作品" en="RELATED WORK" />
            <div className={styles.related}>
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <div className={styles.back}>
        <TextLink to="/work" zh="返回作品" en="BACK TO WORK" />
      </div>
      {next ? (
        <Link to={`/work/${next.slug}`} className={styles.next} data-cursor="view">
          <div className={styles.nextBg}>
            <img src={next.cover} alt="" />
          </div>
          <p className={styles.nextLabel}>下一个作品 / NEXT PROJECT</p>
          <p className={styles.nextTitle}>{next.title}</p>
        </Link>
      ) : null}
    </article>
  );
}

function groupGallery(items: { image: string; caption?: string; layout: string }[]) {
  const blocks: (
    | { type: "single"; item: (typeof items)[number] }
    | { type: "pair"; items: (typeof items)[number][] }
  )[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const next = items[i + 1];
    if (item.layout === "half" && next?.layout === "half") {
      blocks.push({ type: "pair", items: [item, next] });
      i += 1;
    } else {
      blocks.push({ type: "single", item });
    }
  }
  return blocks;
}
