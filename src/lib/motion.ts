import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const revealEase = "power3.out";

let registered = false;

function ensureTrigger() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function refreshTriggers() {
  if (!registered) return;
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** 标题行：滚动到视口附近时才播放，之前保持隐藏，避免“动不了/闪现”。 */
export function revealLines(root: HTMLElement) {
  if (prefersReducedMotion()) return () => undefined;
  ensureTrigger();
  const lines = root.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!lines.length) return () => undefined;
  const tween = gsap.fromTo(
    lines,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 0.9,
      ease: revealEase,
      stagger: 0.08,
      overwrite: "auto",
      scrollTrigger: {
        trigger: root,
        start: "top 88%",
        once: true,
      },
    },
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/** 图片卡片：每个 MediaFrame 进入视口时做一次 clip + scale 展开。 */
export function revealMedia(root: HTMLElement) {
  if (prefersReducedMotion()) return () => undefined;
  ensureTrigger();
  const targets = root.hasAttribute("data-media-reveal")
    ? [root as HTMLElement]
    : Array.from(root.querySelectorAll<HTMLElement>("[data-media-reveal]"));
  if (!targets.length) return () => undefined;
  const tweens = targets.map((el) =>
    gsap.fromTo(
      el,
      { clipPath: "inset(12% 0 0 0)", scale: 1.04 },
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1,
        ease: revealEase,
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      },
    ),
  );
  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  };
}
