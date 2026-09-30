import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

const LINKS = [
  { to: "/#work", zh: "作品", en: "WORK" },
  { to: "/about", zh: "关于我", en: "ABOUT" },
  { to: "/moments", zh: "片刻", en: "MOMENTS" },
  { to: "/#contact", zh: "联系", en: "CONTACT" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={[styles.nav, scrolled ? styles.scrolled : ""].join(" ")}>
      <Link to="/" className={styles.brand} aria-label="FAYE 首页">
        FAYE
      </Link>
      <nav className={styles.links} aria-label="主导航">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              [styles.item, isActive && !link.to.includes("#") ? styles.isActive : ""].join(" ")
            }
          >
            <span className={styles.zh}>{link.zh}</span>
            <span className={styles.en}>{link.en}</span>
          </NavLink>
        ))}
      </nav>
      <button
        className={styles.menuBtn}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "关闭 / CLOSE" : "菜单 / MENU"}
      </button>
      {open ? (
        <>
          <button className={styles.overlay} aria-label="关闭菜单" onClick={() => setOpen(false)} />
          <nav id="mobile-menu" className={styles.drawer} aria-label="移动导航">
            {LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={styles.item} onClick={() => setOpen(false)}>
                <span className={styles.zh}>{link.zh}</span>
                <span className={styles.en}>{link.en}</span>
              </Link>
            ))}
          </nav>
        </>
      ) : null}
    </header>
  );
}
