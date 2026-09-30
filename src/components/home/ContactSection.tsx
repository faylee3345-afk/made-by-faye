import { useState } from "react";
import type { SiteSettings } from "../../types/content";
import styles from "./ContactSection.module.scss";

export function ContactSection({
  settings,
  titleZh,
  titleEn,
}: {
  settings: SiteSettings;
  titleZh: string;
  titleEn: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const links = [
    { zh: "电话", en: "PHONE", href: settings.phone ? `tel:${settings.phone.replace(/\s+/g, "")}` : undefined, value: settings.phone },
    { zh: "微信", en: "WECHAT", href: undefined, value: settings.wechat },
    { zh: "邮箱", en: "EMAIL", href: settings.email ? `mailto:${settings.email}` : undefined, value: settings.email },
    { zh: "小红书", en: "XIAOHONGSHU", href: settings.xiaohongshu, value: settings.xiaohongshu },
  ].filter((item): item is { zh: string; en: string; href: string | undefined; value: string } =>
    Boolean(item.value),
  );

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied((prev) => (prev === key ? null : prev)), 1600);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section className={styles.section} id="contact">
      <h2 className={styles.title}>{titleZh}</h2>
      <p className={styles.en}>{titleEn}</p>
      <ul className={styles.list}>
        {links.map((item) => (
          <li key={item.en} className={styles.row}>
            {item.href ? (
              <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span className={styles.label}>
                  {item.zh} / {item.en}
                </span>
                <span>{item.value}</span>
              </a>
            ) : (
              <button
                type="button"
                className={styles.copy}
                onClick={() => copy(item.en, item.value)}
                title="点击复制"
              >
                <span className={styles.label}>
                  {item.zh} / {item.en}
                </span>
                <span>{item.value}</span>
                <span className={styles.hint}>{copied === item.en ? "已复制" : "点击复制"}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
