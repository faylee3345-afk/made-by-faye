import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FILTERS } from "../lib/categories";
import { getProjects } from "../lib/content";
import { useSeo } from "../lib/seo";
import type { CategoryId } from "../types/content";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ProjectCard } from "../components/work/ProjectCard";
import styles from "./WorkPage.module.scss";

export function WorkPage() {
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") ?? "all") as "all" | CategoryId;
  const projects = useMemo(() => {
    const all = getProjects();
    if (category === "all") return all;
    return all.filter(
      (item) => item.primaryCategory === category || item.relatedCategories.includes(category),
    );
  }, [category]);

  useSeo("全部作品｜FAYE", "All work — Faye Li");

  return (
    <div className={styles.page}>
      <SectionHeader zh="全部作品" en="ALL WORK" />
      <div className={styles.filters} role="tablist" aria-label="作品分类">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={category === item.id}
            className={[styles.filter, category === item.id ? styles.active : ""].join(" ")}
            onClick={() => {
              const next = new URLSearchParams(params);
              if (item.id === "all") next.delete("category");
              else next.set("category", item.id);
              setParams(next, { replace: true });
            }}
          >
            <span>{item.zh}</span>
            <span>{item.en}</span>
          </button>
        ))}
      </div>
      {projects.length ? (
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={String(i + 1).padStart(2, "0")}
              ratio={i % 5 === 2 ? "portrait" : "landscape"}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>这一类暂时还没有公开作品。</p>
      )}
    </div>
  );
}
