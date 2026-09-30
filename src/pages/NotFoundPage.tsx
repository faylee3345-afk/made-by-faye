import { TextLink } from "../components/ui/TextLink";
import { useSeo } from "../lib/seo";
import styles from "./NotFoundPage.module.scss";

export function NotFoundPage() {
  useSeo("页面不存在｜FAYE", "404");
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>这一页不在现场。</h1>
      <p className={styles.en}>PAGE NOT FOUND</p>
      <TextLink to="/" zh="回到首页" en="BACK HOME" />
    </div>
  );
}
