import { getSettings } from "../../lib/content";
import styles from "./Footer.module.scss";

export function Footer() {
  const settings = getSettings();
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} FAYE</p>
      <p>
        {settings.footerZh} / {settings.footerEn}
      </p>
      <p>
        <a href="/admin/" className={styles.admin}>
          管理 / ADMIN
        </a>
      </p>
    </footer>
  );
}
