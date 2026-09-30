import type { CategoryId, CategoryMeta } from "../types/content";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "on-camera",
    zh: "镜头之前",
    en: "ON CAMERA",
    number: "01",
    noteZh: "镜头开启之后，表达开始发生。",
    moreZh: "查看更多镜头作品",
    moreEn: "MORE ON CAMERA",
  },
  {
    id: "sports",
    zh: "赛场现场",
    en: "SPORTS",
    number: "02",
    noteZh: "声音要跟得上身体、水和风。",
    moreZh: "查看更多赛场作品",
    moreEn: "MORE SPORTS",
  },
  {
    id: "stories",
    zh: "故事之间",
    en: "STORIES",
    number: "03",
    noteZh: "先看清楚一个人，再开口。",
    moreZh: "查看更多故事作品",
    moreEn: "MORE STORIES",
  },
  {
    id: "creative",
    zh: "创作现场",
    en: "CREATIVE",
    number: "04",
    noteZh: "不只站在镜头前，也参与作品如何被做出来。",
    moreZh: "查看更多创作作品",
    moreEn: "MORE CREATIVE",
  },
  {
    id: "stage",
    zh: "舞台与现场",
    en: "STAGE",
    number: "05",
    noteZh: "空间、观众、灯光，和那个还没开口的瞬间。",
    moreZh: "查看更多舞台作品",
    moreEn: "MORE STAGE",
  },
  {
    id: "editorial",
    zh: "内容与编辑",
    en: "EDITORIAL",
    number: "06",
    noteZh: "把一次发生，编成还能被读到的东西。",
    moreZh: "查看更多内容作品",
    moreEn: "MORE EDITORIAL",
  },
];

export const FILTERS: { id: "all" | CategoryId; zh: string; en: string }[] = [
  { id: "all", zh: "全部", en: "ALL" },
  { id: "on-camera", zh: "镜头", en: "CAMERA" },
  { id: "sports", zh: "赛场", en: "SPORTS" },
  { id: "stories", zh: "故事", en: "STORIES" },
  { id: "creative", zh: "创作", en: "CREATIVE" },
  { id: "stage", zh: "舞台", en: "STAGE" },
  { id: "editorial", zh: "内容", en: "EDITORIAL" },
];

export function getCategory(id: CategoryId) {
  return CATEGORIES.find((item) => item.id === id);
}
