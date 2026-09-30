import { load as loadYaml } from "js-yaml";
import { CATEGORIES, getCategory } from "./categories";
import type {
  AboutContent,
  CategoryId,
  CategoryMeta,
  FeaturedLayout,
  GalleryItem,
  GalleryLayout,
  HomeContent,
  Milestone,
  MomentItem,
  Project,
  SiteSettings,
  VideoEmbedData,
  VideoProvider,
} from "../types/content";

const projectFiles = import.meta.glob("../../content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const momentFiles = import.meta.glob("../../content/moments/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const milestoneFiles = import.meta.glob("../../content/milestones/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const aboutFile = import.meta.glob("../../content/about.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const settingsFile = import.meta.glob("../../content/settings.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const homeFile = import.meta.glob("../../content/home.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseMarkdown(raw: string) {
  if (!raw.startsWith("---")) return { data: {} as Record<string, unknown>, content: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {} as Record<string, unknown>, content: raw };
  const data = (loadYaml(raw.slice(4, end)) ?? {}) as Record<string, unknown>;
  const content = raw.slice(end + 4).replace(/^\n/, "");
  return { data, content };
}

function slugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? "";
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function asBool(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

const CATEGORY_IDS = new Set(CATEGORIES.map((item) => item.id));

function asCategory(value: unknown, fallback: CategoryId = "on-camera"): CategoryId {
  const id = String(value ?? "") as CategoryId;
  return CATEGORY_IDS.has(id) ? id : fallback;
}

function asCategories(value: unknown): CategoryId[] {
  return asStringList(value).filter((item): item is CategoryId =>
    CATEGORY_IDS.has(item as CategoryId),
  );
}

function asRoles(value: unknown) {
  const roles: { zh: string; en?: string }[] = [];
  if (!Array.isArray(value)) return roles;
  for (const item of value) {
    if (typeof item === "string" && item) {
      roles.push({ zh: item });
      continue;
    }
    if (item && typeof item === "object" && "zh" in item) {
      const zh = String((item as { zh: unknown }).zh);
      const en = asString((item as { en?: unknown }).en);
      if (zh) roles.push({ zh, ...(en ? { en } : {}) });
    }
  }
  return roles;
}

function asGallery(value: unknown): GalleryItem[] {
  if (!Array.isArray(value)) return [];
  const layouts = new Set<GalleryLayout>(["full", "wide", "half", "portrait"]);
  const items: GalleryItem[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const image = asString((item as { image?: unknown }).image);
    if (!image) continue;
    const layoutRaw = asString((item as { layout?: unknown }).layout, "full") as GalleryLayout;
    const caption = asString((item as { caption?: unknown }).caption);
    items.push({
      image,
      layout: layouts.has(layoutRaw) ? layoutRaw : "full",
      ...(caption ? { caption } : {}),
    });
  }
  return items;
}

function asVideo(value: unknown): VideoEmbedData | undefined {
  if (!value || typeof value !== "object") return undefined;
  const obj = value as { url?: unknown; file?: unknown; provider?: unknown };
  const file = asString(obj.file);
  const url = asString(obj.url);
  const src = file || url;
  if (!src) return undefined;
  if (file) return { provider: "file", url: file };
  const providerRaw = asString(obj.provider, "file") as VideoProvider;
  const provider: VideoProvider =
    providerRaw === "youtube" || providerRaw === "bilibili" || providerRaw === "file"
      ? providerRaw
      : "file";
  return { provider, url };
}

function asFeaturedLayout(value: unknown): FeaturedLayout {
  const layout = asString(value, "large") as FeaturedLayout;
  if (["large", "portrait", "full", "offset", "text"].includes(layout)) return layout;
  return "large";
}

function asStats(value: unknown) {
  if (!Array.isArray(value)) return [];
  const stats: { value: string; label: string; labelEn?: string }[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const label = asString((item as { label?: unknown }).label);
    const val = asString((item as { value?: unknown }).value);
    if (!label || !val) continue;
    const labelEn = asString((item as { labelEn?: unknown }).labelEn);
    stats.push({ value: val, label, ...(labelEn ? { labelEn } : {}) });
  }
  return stats;
}

function asCategoryMetaList(value: unknown): CategoryMeta[] {
  if (!Array.isArray(value)) return CATEGORIES;
  const items: CategoryMeta[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const id = asCategory((entry as { id?: unknown }).id, "on-camera");
    const fallback = CATEGORIES.find((item) => item.id === id) ?? CATEGORIES[0];
    items.push({
      id,
      zh: asString((entry as { zh?: unknown }).zh, fallback.zh),
      en: asString((entry as { en?: unknown }).en, fallback.en),
      number: asString((entry as { number?: unknown }).number, fallback.number),
      noteZh: asString((entry as { noteZh?: unknown }).noteZh, fallback.noteZh),
      moreZh: asString((entry as { moreZh?: unknown }).moreZh, fallback.moreZh),
      moreEn: asString((entry as { moreEn?: unknown }).moreEn, fallback.moreEn),
    });
  }
  return items.length ? items : CATEGORIES;
}

export function getProjects(): Project[] {
  return Object.entries(projectFiles)
    .map(([path, raw]) => {
      const { data, content } = parseMarkdown(raw);
      const slug = asString(data.slug, slugFromPath(path));
      return {
        slug,
        title: asString(data.title, slug),
        titleEn: asString(data.titleEn) || undefined,
        year: asNumber(data.year, 2026),
        date: asString(data.date) || undefined,
        primaryCategory: asCategory(data.primaryCategory),
        relatedCategories: asCategories(data.relatedCategories),
        roles: asRoles(data.roles),
        summary: asString(data.summary),
        body: content.trim(),
        cover: asString(data.cover, "/uploads/projects/placeholder.svg"),
        hero: asString(data.hero) || undefined,
        video: asVideo(data.video),
        gallery: asGallery(data.gallery),
        behind: asString(data.behind) || undefined,
        credits: asString(data.credits) || undefined,
        tags: asStringList(data.tags),
        featured: asBool(data.featured),
        featuredOrder: asNumber(data.featuredOrder, 99),
        categoryOrder: asNumber(data.categoryOrder, 99),
        published: asBool(data.published, true),
        featuredLayout: asFeaturedLayout(data.featuredLayout),
        seoTitle: asString(data.seoTitle) || undefined,
        seoDescription: asString(data.seoDescription) || undefined,
      } satisfies Project;
    })
    .filter((project) => project.published)
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, "zh"));
}

export function getFeaturedProjects() {
  return getProjects()
    .filter((project) => project.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
    .slice(0, 8);
}

export function getProjectsByCategory(id: CategoryId, limit?: number) {
  const list = getProjects()
    .filter(
      (project) =>
        project.primaryCategory === id || project.relatedCategories.includes(id),
    )
    .sort((a, b) => a.categoryOrder - b.categoryOrder || b.year - a.year);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3) {
  return getProjects()
    .filter((item) => item.slug !== project.slug)
    .filter(
      (item) =>
        item.primaryCategory === project.primaryCategory ||
        item.relatedCategories.includes(project.primaryCategory),
    )
    .slice(0, limit);
}

export function getNextProject(slug: string) {
  const featured = getFeaturedProjects();
  const all = featured.length > 1 ? featured : getProjects();
  const index = all.findIndex((item) => item.slug === slug);
  if (index === -1) return all[0];
  return all[(index + 1) % all.length];
}

export function getMoments(): MomentItem[] {
  return Object.entries(momentFiles)
    .map(([path, raw]) => {
      const { data } = parseMarkdown(raw);
      return {
        slug: asString(data.slug, slugFromPath(path)),
        image: asString(data.image),
        date: asString(data.date),
        location: asString(data.location) || undefined,
        caption: asString(data.caption) || undefined,
        order: asNumber(data.order, 99),
        published: asBool(data.published, true),
      } satisfies MomentItem;
    })
    .filter((item) => item.published && item.image)
    .sort((a, b) => a.order - b.order);
}

export function getMilestones(): Milestone[] {
  return Object.entries(milestoneFiles)
    .map(([path, raw]) => {
      const { data, content } = parseMarkdown(raw);
      return {
        slug: slugFromPath(path),
        year: asString(data.year),
        title: asString(data.title),
        titleEn: asString(data.titleEn) || undefined,
        description: asString(data.description, content.trim()) || undefined,
        type: asString(data.type) || undefined,
        order: asNumber(data.order, 99),
      } satisfies Milestone;
    })
    .sort((a, b) => a.order - b.order);
}

export function getAbout(): AboutContent {
  const raw = Object.values(aboutFile)[0] ?? "---\n---\n";
  const { data, content } = parseMarkdown(raw);
  return {
    statementZh: asString(data.statementZh),
    statementEn: asString(data.statementEn) || undefined,
    photo: asString(data.photo) || undefined,
    expression: asString(data.expression) || undefined,
    field: asString(data.field) || undefined,
    making: asString(data.making) || undefined,
    body: content.trim(),
    stats: asStats(data.stats),
    education: asString(data.education) || undefined,
  };
}

export function getSettings(): SiteSettings {
  const raw = Object.values(settingsFile)[0] ?? "---\n---\n";
  const { data } = parseMarkdown(raw);
  return {
    heroKicker: asString(data.heroKicker, "FAYE"),
    heroLine1: asString(data.heroLine1, "MADE"),
    heroLine2: asString(data.heroLine2, "BY"),
    heroLine3: asString(data.heroLine3, "FAYE"),
    subtitleZh: asString(data.subtitleZh, "声音、镜头、现场，以及我留下的一些作品。"),
    subtitleEn: asString(
      data.subtitleEn,
      "Selected works in voice, camera and storytelling.",
    ),
    heroImage: asString(data.heroImage, "/uploads/about/hero.svg"),
    heroVideo: asString(data.heroVideo) || undefined,
    email: asString(data.email, "hello@example.com"),
    phone: asString(data.phone) || undefined,
    wechat: asString(data.wechat) || undefined,
    xiaohongshu: asString(data.xiaohongshu) || undefined,
    footerZh: asString(data.footerZh, "带着好奇做出来的。"),
    footerEn: asString(data.footerEn, "Made with curiosity."),
    seoTitle: asString(data.seoTitle, "Faye 李杉杉｜个人作品集"),
    seoDescription: asString(
      data.seoDescription,
      "Faye Li — Portfolio. 表达，不只发生在话筒前。",
    ),
    accent: asString(data.accent, "#c6452e"),
  };
}

export function getHome(): HomeContent {
  const raw = Object.values(homeFile)[0] ?? "---\n---\n";
  const { data } = parseMarkdown(raw);
  return {
    statementZh: asString(data.statementZh, "表达，不只发生在话筒前。"),
    statementEn: asString(data.statementEn, "Beyond the microphone."),
    scrollZh: asString(data.scrollZh, "向下探索"),
    scrollEn: asString(data.scrollEn, "SCROLL TO EXPLORE"),
    selectedNumber: asString(data.selectedNumber, "00"),
    selectedZh: asString(data.selectedZh, "精选作品"),
    selectedEn: asString(data.selectedEn, "SELECTED WORKS"),
    selectedMoreZh: asString(data.selectedMoreZh, "查看全部"),
    selectedMoreEn: asString(data.selectedMoreEn, "VIEW ALL"),
    aboutTitleZh: asString(data.aboutTitleZh, "关于我"),
    aboutTitleEn: asString(data.aboutTitleEn, "ABOUT"),
    aboutMoreZh: asString(data.aboutMoreZh, "继续阅读"),
    aboutMoreEn: asString(data.aboutMoreEn, "READ ABOUT"),
    momentsTitleZh: asString(data.momentsTitleZh, "片刻"),
    momentsTitleEn: asString(data.momentsTitleEn, "MOMENTS"),
    momentsNote: asString(data.momentsNote, "作品之外的一些瞬间。"),
    momentsMoreZh: asString(data.momentsMoreZh, "全部片刻"),
    momentsMoreEn: asString(data.momentsMoreEn, "ALL MOMENTS"),
    contactTitleZh: asString(data.contactTitleZh, "一起做点什么。"),
    contactTitleEn: asString(data.contactTitleEn, "LET'S MAKE SOMETHING."),
    categories: asCategoryMetaList(data.categories),
  };
}

export function getCategoryLabel(id: CategoryId) {
  return getCategory(id);
}
