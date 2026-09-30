export type CategoryId =
  | "on-camera"
  | "sports"
  | "stories"
  | "creative"
  | "stage"
  | "editorial";

export type GalleryLayout = "full" | "wide" | "half" | "portrait";

export type FeaturedLayout = "large" | "portrait" | "full" | "offset" | "text";

export type VideoProvider = "youtube" | "bilibili" | "file";

export interface Role {
  zh: string;
  en?: string;
}

export interface GalleryItem {
  image: string;
  caption?: string;
  layout: GalleryLayout;
}

export interface VideoEmbedData {
  provider: VideoProvider;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  titleEn?: string;
  year: number;
  date?: string;
  primaryCategory: CategoryId;
  relatedCategories: CategoryId[];
  roles: Role[];
  summary: string;
  body: string;
  cover: string;
  hero?: string;
  video?: VideoEmbedData;
  gallery: GalleryItem[];
  behind?: string;
  credits?: string;
  tags: string[];
  featured: boolean;
  featuredOrder: number;
  categoryOrder: number;
  published: boolean;
  featuredLayout: FeaturedLayout;
  seoTitle?: string;
  seoDescription?: string;
}

export interface MomentItem {
  slug: string;
  image: string;
  date: string;
  location?: string;
  caption?: string;
  order: number;
  published: boolean;
}

export interface Milestone {
  slug: string;
  year: string;
  title: string;
  titleEn?: string;
  description?: string;
  type?: string;
  order: number;
}

export interface AboutContent {
  statementZh: string;
  statementEn?: string;
  photo?: string;
  expression?: string;
  field?: string;
  making?: string;
  body: string;
  stats: { value: string; label: string; labelEn?: string }[];
  education?: string;
}

export interface SiteSettings {
  heroKicker: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  subtitleZh: string;
  subtitleEn: string;
  heroImage: string;
  heroVideo?: string;
  email: string;
  phone?: string;
  wechat?: string;
  xiaohongshu?: string;
  footerZh: string;
  footerEn: string;
  seoTitle: string;
  seoDescription: string;
  accent: string;
}

export interface CategoryMeta {
  id: CategoryId;
  zh: string;
  en: string;
  number: string;
  noteZh: string;
  moreZh: string;
  moreEn: string;
}

export interface HomeContent {
  statementZh: string;
  statementEn: string;
  scrollZh: string;
  scrollEn: string;
  selectedNumber: string;
  selectedZh: string;
  selectedEn: string;
  selectedMoreZh: string;
  selectedMoreEn: string;
  aboutTitleZh: string;
  aboutTitleEn: string;
  aboutMoreZh: string;
  aboutMoreEn: string;
  momentsTitleZh: string;
  momentsTitleEn: string;
  momentsNote: string;
  momentsMoreZh: string;
  momentsMoreEn: string;
  contactTitleZh: string;
  contactTitleEn: string;
  categories: CategoryMeta[];
}
