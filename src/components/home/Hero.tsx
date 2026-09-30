import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/motion";
import type { SiteSettings } from "../../types/content";
import styles from "./Hero.module.scss";

export function Hero({
  settings,
  scrollZh,
  scrollEn,
}: {
  settings: SiteSettings;
  scrollZh: string;
  scrollEn: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const kicker = el.querySelector("[data-kicker]");
    const lines = el.querySelectorAll("[data-line] span");
    const media = el.querySelector("[data-hero-media]");
    const rest = el.querySelectorAll("[data-hero-rest]");
    const tl = gsap.timeline();
    tl.fromTo(kicker, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
      .fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.15",
      )
      .fromTo(media, { scale: 1.04 }, { scale: 1, duration: 1.1, ease: "power3.out" }, 0)
      .fromTo(rest, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.5");
    return () => {
      tl.kill();
      gsap.set([kicker, lines, rest], { clearProps: "transform,opacity" });
    };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-label="首页主视觉">
      <div className={styles.media} data-hero-media>
        {settings.heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={settings.heroImage}
            preload="metadata"
          >
            <source src={settings.heroVideo} />
          </video>
        ) : (
          <img src={settings.heroImage} alt="工作现场" fetchPriority="high" />
        )}
        <div className={styles.veil} />
      </div>
      <p className={styles.kicker}>
        <span data-kicker>{settings.heroKicker}</span>
      </p>
      <h1 className={styles.title}>
        <span className={styles.line} data-line>
          <span>{settings.heroLine1}</span>
        </span>
        <span className={styles.line} data-line>
          <span>{settings.heroLine2}</span>
        </span>
        <span className={styles.line} data-line>
          <span>{settings.heroLine3}</span>
        </span>
      </h1>
      <div className={styles.copy} data-hero-rest>
        <p>{settings.subtitleZh}</p>
        <p className={styles.en}>{settings.subtitleEn}</p>
      </div>
      <p className={styles.scroll} data-hero-rest>
        {scrollZh} / {scrollEn} ↓
      </p>
    </section>
  );
}
