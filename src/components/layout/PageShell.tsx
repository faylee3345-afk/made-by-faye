import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getSettings } from "../../lib/content";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import styles from "./PageShell.module.scss";

export function PageShell() {
  const location = useLocation();
  const settings = getSettings();

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-override", settings.accent);
    document.documentElement.setAttribute("data-accent", "");
  }, [settings.accent]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div className={styles.page}>
      <CustomCursor />
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
